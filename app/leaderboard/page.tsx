'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Medal, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  registrationTime: string;
  dutyTime: number;
}

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users/register');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-orange-500" />;
      default: return <span className="text-black font-semibold">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return <Badge className="bg-yellow-400 text-black">1st</Badge>;
      case 2: return <Badge className="bg-gray-400 text-white">2nd</Badge>;
      case 3: return <Badge className="bg-orange-500 text-white">3rd</Badge>;
      default: return <Badge variant="outline" className="border-black text-black">#{rank}</Badge>;
    }
  };

  const formatDutyTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-black">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:text-blue-600 transition">
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Leaderboard</h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-black">Scout Duty Leaderboard</h2>
          <p className="text-gray-600">Top scouts ranked by total duty time</p>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading leaderboard...</p>
          </div>
        ) : users.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-black">No Scouts Yet</h3>
              <p className="text-gray-500">Be the first to register and get ranked!</p>
              <Link href="/register">
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Register Now
                </button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {users.map((user, index) => {
              const rank = index + 1;
              return (
                <Card
                  key={user.id}
                  className={`transition-shadow hover:shadow-lg ${
                    rank <= 3 ? 'border-2 border-blue-200' : ''
                  }`}
                >
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      {getRankIcon(rank)}
                      <div>
                        <h4 className="text-lg font-semibold text-black">{user.name}</h4>
                        <p className="text-sm text-gray-600">📞 {user.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="flex items-center justify-end space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-black">
                          {formatDutyTime(user.dutyTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Total Duty Time</p>
                      {getRankBadge(rank)}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Legend Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-black mb-4">How Rankings Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Ranked by total duty time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Time tracked by admins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-green-600" />
              <span>Top 3 get special badges</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
