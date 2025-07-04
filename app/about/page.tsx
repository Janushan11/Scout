'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Clock, Trophy, Shield, Target, Heart, Star, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 text-black overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/3 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center text-[#2563EB] hover:text-black transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-black rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
                Scout First
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Modern Scout Management Platform
          </div>
          <h1 className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-blue-600 via-black to-blue-800 bg-clip-text text-transparent leading-tight">
            About Scout First
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing scout organization management with cutting-edge technology, 
            streamlined workflows, and data-driven insights to empower every scout's journey.
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-black rounded-full"></div>
          </div>
        </section>

        {/* Mission */}
        <section>
          <Card className="shadow-2xl bg-white/70 backdrop-blur-sm border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-black/5"></div>
            <CardHeader className="text-center relative z-10 pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-black rounded-2xl mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-black mb-2">Our Mission</CardTitle>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-black rounded-full mx-auto"></div>
            </CardHeader>
            <CardContent className="text-center relative z-10 pb-12">
              <blockquote className="text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-medium italic">
                "To empower scout organizations with modern tools that streamline administration, recognize
                dedication, and foster a culture of service and excellence through innovative technology."
              </blockquote>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern scout organizations with enterprise-grade functionality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-white" />,
                title: 'Smart User Management',
                desc: 'Lightning-fast QR-based registration with intelligent profile management and automated onboarding workflows.',
                bg: 'from-blue-600 to-blue-700',
                accent: 'blue',
              },
              {
                icon: <Clock className="w-8 h-8 text-white" />,
                title: 'Advanced Time Tracking',
                desc: 'Precision duty tracking with AI-powered analytics, automatic calculations, and real-time progress monitoring.',
                bg: 'from-black to-gray-800',
                accent: 'black',
              },
              {
                icon: <Trophy className="w-8 h-8 text-white" />,
                title: 'Dynamic Leaderboards',
                desc: 'Gamified recognition system with customizable metrics, achievements, and milestone celebrations.',
                bg: 'from-blue-600 to-blue-700',
                accent: 'blue',
              },
              {
                icon: <Shield className="w-8 h-8 text-white" />,
                title: 'Enterprise Security',
                desc: 'Multi-layered admin controls with role-based permissions, audit trails, and compliance management.',
                bg: 'from-black to-gray-800',
                accent: 'black',
              },
              {
                icon: <Target className="w-8 h-8 text-white" />,
                title: 'Goal-Driven Analytics',
                desc: 'Data-driven insights based on scout values, leadership development, and community impact metrics.',
                bg: 'from-blue-600 to-blue-700',
                accent: 'blue',
              },
              {
                icon: <Heart className="w-8 h-8 text-white" />,
                title: 'Community Excellence',
                desc: 'Celebrate every contribution with personalized recognition, team building tools, and social features.',
                bg: 'from-black to-gray-800',
                accent: 'black',
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 overflow-hidden hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10 pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-black group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-center text-gray-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '10,000+', label: 'Active Scouts', icon: <Users className="w-6 h-6" /> },
            { number: '500+', label: 'Organizations', icon: <Globe className="w-6 h-6" /> },
            { number: '1M+', label: 'Hours Tracked', icon: <Clock className="w-6 h-6" /> },
          ].map((stat, i) => (
            <Card key={i} className="text-center shadow-xl bg-white/80 backdrop-blur-sm border-0 group hover:shadow-2xl transition-all duration-300">
              <CardContent className="py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-black rounded-xl mb-4 text-white group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-black mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Contact Info */}
        <section>
          <Card className="shadow-2xl bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-black/5"></div>
            <CardHeader className="text-center relative z-10 pb-8">
              <CardTitle className="text-3xl font-bold text-black mb-4">Get in Touch</CardTitle>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to transform your scout organization? Our team is here to help you get started.
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-center relative z-10 pb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-black mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 text-gray-700">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">📞</span>
                    </div>
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-gray-700">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">📧</span>
                    </div>
                    <span className="font-medium">info@scoutfirst.com</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-gray-700">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">🌐</span>
                    </div>
                    <span className="font-medium">www.scoutfirst.com</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-black mb-6">Support Hours</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center max-w-xs mx-auto">
                    <span className="font-medium">Monday – Friday</span>
                    <span>9 AM – 6 PM</span>
                  </div>
                  <div className="flex justify-between items-center max-w-xs mx-auto">
                    <span className="font-medium">Saturday</span>
                    <span>10 AM – 4 PM</span>
                  </div>
                  <div className="flex justify-between items-center max-w-xs mx-auto">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">All times in Eastern Time (ET)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-black mb-4">Ready to Transform Your Organization?</h3>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of scout organizations already using Scout First to build stronger communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Get Started Free
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-200"
              >
                Watch Demo
                <Star className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-black to-gray-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-white rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-black" />
              </div>
              <span className="text-2xl font-bold">Scout First</span>
            </div>
            <p className="text-gray-400">
              © 2024 Scout First. All rights reserved. Built with dedication for scout communities worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}