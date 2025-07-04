import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for development
// In production, this would be replaced with MongoDB and proper password hashing
const admins = [
  {
    id: 'super-admin-1',
    email: 'super@scoutfirst.com',
    password: 'superadmin123', // In production, this would be hashed
    type: 'super'
  },
  {
    id: 'secondary-admin-1',
    email: 'secondary@scoutfirst.com',
    password: 'secondaryadmin123', // In production, this would be hashed
    type: 'secondary'
  }
];

export async function POST(request: NextRequest) {
  console.log('POST /api/auth/login called');
  
  try {
    const { email, password, adminType } = await request.json();
    console.log('Login attempt:', { email, adminType });

    // Validate input
    if (!email || !password || !adminType) {
      return NextResponse.json(
        { message: 'Email, password, and admin type are required' },
        { status: 400 }
      );
    }

    // Find admin
    const admin = admins.find(a => 
      a.email === email && 
      a.password === password && 
      a.type === adminType
    );

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate simple token (in production, use JWT)
    const token = `token-${admin.id}-${Date.now()}`;
    
    console.log('Login successful for:', admin.email);

    return NextResponse.json({
      message: 'Login successful',
      token,
      adminType: admin.type,
      adminId: admin.id,
      adminEmail: admin.email
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}