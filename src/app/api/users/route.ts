import { hash } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/api/config';
import connectDB from '@/app/api/lib/db';
import Users from '@/app/api/models/users';

/**
 * @desc Returns users.
 * If email (id) is provided on query params, will return a single user
 * otherwise will return a page of users. (page parameters should be on the query params
 * otherwise will use default values for them).
 * @param req
 * @param res
 * @constructor
 */
export async function GET(req: NextRequest, res: NextResponse) {
  const {
    nextUrl: { searchParams },
  } = req;
  try {
    await connectDB();
    if (searchParams.get('id')) {
      console.log(searchParams.get('id'));
      const user = await Users.findOne({ email: searchParams.get('id') });
      if (!user) throw new Error(`user with email ${searchParams.get('id')} does not exist`);
      return new Response(JSON.stringify(user), { status: 200, headers: { 'content-type': 'application/json' } });
    } else {
      const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
      const pageSize = Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE;
      const users = await Users.find({})
        .skip(page * pageSize)
        .limit(pageSize);
      const count = await Users.countDocuments({});
      const pages = Math.ceil(count / pageSize);
      return new Response(JSON.stringify({ users, pages, items: count }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
}

/**
 * @desc Deletes a user
 */

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const params = await req.json();
    const { id } = params;
    if (!id) throw new Error(`Id is not defined`);
    await Users.deleteOne({ email: id });
    return new Response(JSON.stringify({ message: `User ${id} removed successfully` }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
}
/**
 * @desc creates a new user
 * @param req
 * @param res
 * @constructor
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { email, password, name, lastName, photoUrl, role = 'user', jobTitle, phone, location } = await req.json();
    /* data validation */
    const oldUser = await Users.findOne({ email: email });
    if (oldUser) throw new Error(`A user with email ${email} already exists`);
    if (!name) throw new Error(`Name can't be empty`);
    if (!lastName) throw new Error(`Last Name can't be empty`);
    if (!password) throw new Error(`Password can't be empty`);

    const hashedPassword = await hash(password, 8);

    const newUser = new Users({
      email,
      name,
      lastName,
      password: hashedPassword,
      photoUrl: photoUrl,
      role,
      active: true,
      jobTitle,
      phone,
      location,
    });
    await newUser.save();
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
}
