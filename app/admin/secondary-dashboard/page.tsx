'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  LogOut, 
  Shield,
  Calendar,
  Timer,
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  registrationTime: string;
  dutyTime: number;
}

export default function SecondaryDashboard() {
  console.log('SecondaryDashboard component rendered');
  
  const [users, setUsers] = useState<User[]>([]);
  const [timeFormData, setTimeFormData] = useState({
    studentId: '',
    name: '',
    dutyStartTime: '',
    dutyEndTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ email: '', type: '' });
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in as secondary admin
    const token = localStorage.getItem('token');
    const adminType = localStorage.getItem('adminType');
    const adminEmail = localStorage.getItem('adminEmail');
    
    if (!token || adminType !== 'secondary') {
      console.log('Unauthorized access, redirecting to login');
      router.push('/login');
      return;
    }
    
    setAdminInfo({ email: adminEmail || '', type: adminType || '' });
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    console.log('Fetching users');
    try {
      const response = await fetch('/api/users/register');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('adminType');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    router.push('/');
  };

  const handleTimeSubmit = async () => {
    console.log('Submitting time data:', timeFormData);
    setLoading(true);
    
    try {
      // Calculate duty time in minutes
      const startTime = new Date(`2024-01-01T${timeFormData.dutyStartTime}:00`);
      const endTime = new Date(`2024-01-01T${timeFormData.dutyEndTime}:00`);
      const dutyTimeMinutes = Math.max(0, Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)));
      
      // Update user's duty time
      const userIndex = users.findIndex(u => u.id === timeFormData.studentId || u.name === timeFormData.name);
      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex].dutyTime += dutyTimeMinutes;
        setUsers(updatedUsers);
        
        alert(`Duty time updated! Added ${Math.floor(dutyTimeMinutes / 60)}h ${dutyTimeMinutes % 60}m`);
        setTimeFormData({ studentId: '', name: '', dutyStartTime: '', dutyEndTime: '' });
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.error('Error updating duty time:', error);
      alert('Error updating duty time');
    } finally {
      setLoading(false);
    }
  };

  const formatDutyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-scout-light to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-scout-blue rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-scout-dark">Secondary Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-scout-dark/70">Welcome, {adminInfo.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Time Management Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="w-5 h-5" />
                <span>Time Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input
                      id="student-id"
                      value={timeFormData.studentId}
                      onChange={(e) => setTimeFormData({ ...timeFormData, studentId: e.target.value })}
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="student-name">Name</Label>
                    <Input
                      id="student-name"
                      value={timeFormData.name}
                      onChange={(e) => setTimeFormData({ ...timeFormData, name: e.target.value })}
                      placeholder="Enter student name"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duty-start">Duty Start Time</Label>
                    <Input
                      id="duty-start"
                      type="time"
                      value={timeFormData.dutyStartTime}
                      onChange={(e) => setTimeFormData({ ...timeFormData, dutyStartTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duty-end">Duty End Time</Label>
                    <Input
                      id="duty-end"
                      type="time"
                      value={timeFormData.dutyEndTime}
                      onChange={(e) => setTimeFormData({ ...timeFormData, dutyEndTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button 
                  onClick={handleTimeSubmit} 
                  disabled={loading}
                  className="w-full bg-scout-blue hover:bg-scout-blue/90"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {loading ? 'Submitting...' : 'Submit Time Entry'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick User Reference */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>User Reference</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-scout-dark/70 mb-4">
                  Quick reference for registered users and their current duty time:
                </p>
                {users.slice(0, 10).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-scout-dark">{user.name}</p>
                      <p className="text-sm text-scout-dark/70">ID: {user.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-scout-blue">{formatDutyTime(user.dutyTime)}</p>
                      <p className="text-xs text-scout-dark/70">Total time</p>
                    </div>
                  </div>
                ))}
                {users.length === 0 && (
                  <div className="text-center py-8 text-scout-dark/70">
                    No users registered yet.
                  </div>
                )}
                {users.length > 10 && (
                  <div className="text-center py-2 text-scout-dark/70">
                    ... and {users.length - 10} more users
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}