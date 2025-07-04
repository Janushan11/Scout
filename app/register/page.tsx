'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, UserPlus, QrCode } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function RegisterPage() {
  console.log('RegisterPage component rendered');
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input change: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    console.log('Register button clicked', formData);
    
    if (!formData.name || !formData.phoneNumber) {
      alert('Please fill in all fields');
      return;
    }

    setIsRegistering(true);
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Registration response:', result);

      if (response.ok) {
        alert('Registration successful!');
        setFormData({ name: '', phoneNumber: '' });
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleGenerateQRCode = () => {
    console.log('Generate QR Code button clicked');
    
    if (!formData.name || !formData.phoneNumber) {
      alert('Please fill in all fields first');
      return;
    }

    const qrData = JSON.stringify({
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      registrationTime: new Date().toISOString(),
      scoutId: `SCOUT-${Date.now()}`
    });

    console.log('Generated QR Code data:', qrData);
    setQRCodeData(qrData);
    setShowQRCode(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-black hover:text-blue-600 transition-colors duration-200">
              <ArrowLeft className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">Back to Home</span>
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">User Registration</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-lg w-full space-y-8">
          {/* Registration Form */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl" data-macaly="registration-form">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-black">Join Scout First</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Register to start tracking your scout activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 py-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-black font-semibold text-sm">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="h-12 text-black bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600 transition-all duration-200"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="phoneNumber" className="text-black font-semibold text-sm">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="h-12 text-black bg-gray-50 border-gray-200 focus:border-blue-600 focus:ring-blue-600 transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleRegister}
                  disabled={isRegistering}
                  className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  {isRegistering ? 'Registering...' : 'Register'}
                </Button>

                <Button
                  onClick={handleGenerateQRCode}
                  variant="outline"
                  className="flex-1 h-12 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  <QrCode className="w-5 h-5 mr-2" />
                  Generate QR Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Display */}
          {showQRCode && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow2xl animate-in fade-in-50" data-macaly="qr-code-display">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-black">Your QR Code</CardTitle>
                <CardDescription className="text-gray-600">
                  Save this QR code for quick access to your scout profile
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4 px-6 py-8">
                <div className="p-4 bg-white rounded-lg shadow-inner">
                  <QRCodeSVG 
                    value={qrCodeData} 
                    size={200}
                    bgColor="#FFFFFF"
                    fgColor="#2563EB"
                    level="M"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-black font-medium">Scout ID: SCOUT-{Date.now()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Scout First. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}