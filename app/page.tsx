'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Home, Trophy, Info, Shield, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminClick = () => {
    console.log('Admin button clicked');
    setShowAdminModal(true);
  };

  const handleAdminTypeSelect = (type: 'super' | 'secondary') => {
    console.log(`Admin type selected: ${type}`);
    setShowAdminModal(false);
    window.location.href = `/login?type=${type}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Left side - Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-black">Scout First</span>
            </div>

            {/* Right side - Navigation */}
            <nav className="flex space-x-8">
              <Link href="/" className="flex items-center text-black hover:text-blue-600 transition-colors duration-200">
                <Home className="w-5 h-5 mr-2" />
                Home
              </Link>
              <Link href="/login" className="flex items-center text-black hover:text-blue-600 transition-colors duration-200">
                <Shield className="w-5 h-5 mr-2" />
                Login
              </Link>
              <Link href="/leaderboard" className="flex items-center text-black hover:text-blue-600 transition-colors duration-200">
                <Trophy className="w-5 h-5 mr-2" />
                Leaderboard
              </Link>
              <Link href="/about" className="flex items-center text-black hover:text-blue-600 transition-colors duration-200">
                <Info className="w-5 h-5 mr-2" />
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
              Scout First
            </h1>
            <p className="text-xl text-black/80 italic font-serif">
              "The real way to gain happiness is to give it to others."
            </p>
            <p className="text-lg text-black/70 font-medium">
              - Robert Baden-Powell, Founder of Scouting
            </p>
            
            {/* Card for 3D Scout Image */}
            <div className="relative bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-lg font-semibold">3D Scout Animation</p>
                  <p className="text-sm opacity-80">Interactive Scout Badge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md space-y-4">
              {/* Admin Button */}
              <Dialog open={showAdminModal} onOpenChange={setShowAdminModal}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={handleAdminClick}
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <Shield className="w-6 h-6 mr-2" />
                    Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold text-black">Select Admin Type</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Button 
                      onClick={() => handleAdminTypeSelect('super')}
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
                    >
                      Super Admin
                    </Button>
                    <Button 
                      onClick={() => handleAdminTypeSelect('secondary')}
                      className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md"
                    >
                      Secondary Admin
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* User Register Button */}
              <Link href="/register" className="block w-full">
                <Button className="w-full h-14 text-lg bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
                  <UserPlus className="w-6 h-6 mr-2" />
                  User Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-white/80">
                📞 +1 (555) 123-4567
              </p>
              <p className="text-white/80 mt-2">
                📧 info@scoutfirst.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">About Scout First</h3>
              <p className="text-white/80">
                Scout First is a comprehensive time management system designed for scout organizations. 
                Our platform helps track scout activities, manage duty schedules, and recognize outstanding contributions 
                to the scouting community.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>© 2025 Scout First. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}