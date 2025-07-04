import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for development
// In production, this would be replaced with MongoDB
let users: Array<{
  id: string;
  name: string;
  phoneNumber: string;
  registrationTime: string;
  dutyTime: number;
}> = [];

export async function POST(request: NextRequest) {
  console.log('POST /api/users/register called');
  
  try {
    const { name, phoneNumber } = await request.json();
    console.log('Registration data received:', { name, phoneNumber });

    // Validate input
    if (!name || !phoneNumber) {
      return NextResponse.json(
        { message: 'Name and phone number are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.phoneNumber === phoneNumber);
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this phone number already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      phoneNumber,
      registrationTime: new Date().toISOString(),
      dutyTime: 0 // Start with 0 duty time
    };

    users.push(newUser);
    console.log('User registered successfully:', newUser);

    return NextResponse.json({
      message: 'User registered successfully',
      user: newUser
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('GET /api/users/register called');
  
  try {
    // Return all users (for leaderboard)
    return NextResponse.json({
      users: users.sort((a, b) => b.dutyTime - a.dutyTime) // Sort by duty time descending
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}