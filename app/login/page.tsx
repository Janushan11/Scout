'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  console.log('LoginPage component rendered');
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminType, setAdminType] = useState<'super' | 'secondary'>('super');
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'super' || type === 'secondary') {
      setAdminType(type);
      console.log(`Admin type set from URL: ${type}`);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input change: ${name} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { ...formData, password: '[HIDDEN]' });
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          adminType
        }),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (response.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('adminType', result.adminType);
        localStorage.setItem('adminId', result.adminId);
        
        if (result.adminType === 'super') {
          router.push('/admin/dashboard');
        } else {
          router.push('/admin/secondary-dashboard');
        }
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-white hover:text-blue-200 transition-colors duration-200">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-3">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-black">
              {adminType === 'super' ? 'Super Admin' : 'Secondary Admin'} Login
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access the admin dashboard with your credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-black font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="h-12 pr-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 transition-colors duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Need to switch admin type?{' '}
                <Link 
                  href={`/login?type=${adminType === 'super' ? 'secondary' : 'super'}`}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  {adminType === 'super' ? 'Secondary Admin' : 'Super Admin'} Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; 2025 Admin Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}