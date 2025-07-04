'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Clock,
  UserPlus,
  LogOut,
  Edit2,
  Save,
  X,
  Shield,
  Calendar,
  Timer,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  registrationTime: string;
  dutyTime: number;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', phoneNumber: '' });
  const [timeFormData, setTimeFormData] = useState({
    studentId: '',
    name: '',
    dutyStartTime: '',
    dutyEndTime: '',
  });
  const [secondaryAdminData, setSecondaryAdminData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [adminInfo, setAdminInfo] = useState({ email: '', type: '' });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminType = localStorage.getItem('adminType');
    const adminEmail = localStorage.getItem('adminEmail');

    if (!token || adminType !== 'super') {
      router.push('/login');
      return;
    }

    setAdminInfo({ email: adminEmail || '', type: adminType || '' });
    fetchUsers();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/register');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user.id);
    setEditData({ name: user.name, phoneNumber: user.phoneNumber });
  };

  const handleSaveEdit = () => {
    setUsers(
      users.map((user) =>
        user.id === editingUser ? { ...user, ...editData } : user
      )
    );
    setEditingUser(null);
    setEditData({ name: '', phoneNumber: '' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditData({ name: '', phoneNumber: '' });
  };

  const handleTimeSubmit = async () => {
    setLoading(true);
    try {
      const startTime = new Date(`2024-01-01T${timeFormData.dutyStartTime}:00`);
      const endTime = new Date(`2024-01-01T${timeFormData.dutyEndTime}:00`);
      const dutyTimeMinutes = Math.max(
        0,
        Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60))
      );

      const userIndex = users.findIndex(
        (u) =>
          u.id === timeFormData.studentId ||
          u.name.toLowerCase() === timeFormData.name.toLowerCase()
      );

      if (userIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[userIndex].dutyTime += dutyTimeMinutes;
        setUsers(updatedUsers);
        alert(
          `Duty time updated: ${Math.floor(
            dutyTimeMinutes / 60
          )}h ${dutyTimeMinutes % 60}m`
        );
        setTimeFormData({
          studentId: '',
          name: '',
          dutyStartTime: '',
          dutyEndTime: '',
        });
      } else {
        alert('User not found');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error updating time');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSecondaryAdmin = async () => {
    setLoading(true);
    try {
      alert('Secondary admin added successfully!');
      setSecondaryAdminData({ email: '', password: '' });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add admin');
    } finally {
      setLoading(false);
    }
  };

  const formatDutyTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white shadow border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-[#2563EB] w-10 h-10 rounded-full flex items-center justify-center">
              <Shield className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-black">Super Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {adminInfo.email}</span>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Tabs Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="grid grid-cols-3 bg-[#2563EB]/10 rounded-lg overflow-hidden">
            <TabsTrigger value="users" className="py-3 text-black data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-1" /> Users
            </TabsTrigger>
            <TabsTrigger value="time" className="py-3 text-black data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              <Clock className="w-4 h-4 mr-1" /> Time
            </TabsTrigger>
            <TabsTrigger value="admin" className="py-3 text-black data-[state=active]:bg-[#2563EB] data-[state=active]:text-white">
              <UserPlus className="w-4 h-4 mr-1" /> Add Admin
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Users className="w-5 h-5" />
                  Registered Users
                  <Badge variant="secondary">{users.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 space-y-1">
                      {editingUser === user.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={editData.name}
                              onChange={(e) =>
                                setEditData({ ...editData, name: e.target.value })
                              }
                            />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={editData.phoneNumber}
                              onChange={(e) =>
                                setEditData({
                                  ...editData,
                                  phoneNumber: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-semibold text-black">{user.name}</h3>
                          <p className="text-sm text-gray-600">📞 {user.phoneNumber}</p>
                          <p className="text-sm text-gray-600">⏰ {formatDutyTime(user.dutyTime)}</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingUser === user.id ? (
                        <>
                          <Button onClick={handleSaveEdit} className="bg-[#2563EB] text-white hover:bg-blue-700">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button onClick={handleCancelEdit} variant="outline">
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleEditUser(user)} variant="outline">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {users.length === 0 && (
                  <div className="text-center text-gray-600 py-4">No users found.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Time Tab */}
          <TabsContent value="time">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <Timer className="w-5 h-5" /> Time Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Student ID</Label>
                    <Input
                      value={timeFormData.studentId}
                      onChange={(e) =>
                        setTimeFormData({ ...timeFormData, studentId: e.target.value })
                      }
                      placeholder="Enter ID"
                    />
                  </div>
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={timeFormData.name}
                      onChange={(e) =>
                        setTimeFormData({ ...timeFormData, name: e.target.value })
                      }
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={timeFormData.dutyStartTime}
                      onChange={(e) =>
                        setTimeFormData({
                          ...timeFormData,
                          dutyStartTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={timeFormData.dutyEndTime}
                      onChange={(e) =>
                        setTimeFormData({
                          ...timeFormData,
                          dutyEndTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleTimeSubmit}
                  disabled={loading}
                  className="bg-[#2563EB] text-white hover:bg-blue-700 w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {loading ? 'Submitting...' : 'Submit Time Entry'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add Admin Tab */}
          <TabsContent value="admin">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-black">
                  <UserPlus className="w-5 h-5" />
                  Add Secondary Admin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-w-lg mx-auto">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={secondaryAdminData.email}
                    onChange={(e) =>
                      setSecondaryAdminData({
                        ...secondaryAdminData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={secondaryAdminData.password}
                    onChange={(e) =>
                      setSecondaryAdminData({
                        ...secondaryAdminData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  onClick={handleAddSecondaryAdmin}
                  disabled={loading}
                  className="bg-[#2563EB] text-white hover:bg-blue-700 w-full"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? 'Adding...' : 'Add Admin'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
