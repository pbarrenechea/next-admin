import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

import connectDB from '@/app/api/lib/db';
import Users from '@/app/api/models/users';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email, password, name, lastName } = await request.json();

    const oldUser = await Users.findOne({ email: email });
    if (oldUser) {
      throw new Error(`A user with email ${email} already exists`);
    }
    const hashedPassword = await hash(password, 8);

    const newUser = new Users({
      email,
      name,
      lastName,
      password: hashedPassword,
    });
    const response = await newUser.save();
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message }, { status: 400 });
  }

  return NextResponse.json({ message: 'success' });
}
