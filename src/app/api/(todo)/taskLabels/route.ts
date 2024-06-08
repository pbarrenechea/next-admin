import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/api/config';
import checkSession from '@/app/api/lib/checkSession';
import connectDB from '@/app/api/lib/db';
import TaskLabel from '@/app/api/models/taskLabel';

/**
 * @desc creates a new task label
 * @param req
 * @param res
 * @constructor
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    await checkSession();
    const { name, bgColor = '#000000', fontColor = '#FFFFFF', userId } = await req.json();

    const newTaskLabel = new TaskLabel({
      name,
      bgColor,
      fontColor,
      user: userId,
    });
    await newTaskLabel.save();
    return NextResponse.json({ message: 'success', label: newTaskLabel });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
}

/**
 * @desc Update an existing label
 */
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    await checkSession();
    const { name, bgColor, fontColor, userId, _id } = await req.json();
    const updatedLabel = await TaskLabel.findByIdAndUpdate(
      _id,
      {
        ...(name && { name }),
        ...(bgColor && { bgColor }),
        ...(fontColor && { fontColor }),
        ...(userId && { user: userId }),
      },
      { new: true },
    );
    return new Response(JSON.stringify({ message: 'success', label: updatedLabel }), {
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
 * @desc Returns task labels.
 * If userId is provided on query params, will return labels created by a user.
 * @param req
 * @param res
 * @constructor
 */
export async function GET(req: NextRequest) {
  const {
    nextUrl: { searchParams },
  } = req;
  try {
    await connectDB();
    await checkSession();
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const pageSize = Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE;
    const userId = searchParams.get('userId');
    const labels = await TaskLabel.find({ user: userId })
      .skip(page * pageSize)
      .limit(pageSize);
    const count = await TaskLabel.countDocuments({ user: userId });
    const pages = Math.ceil(count / pageSize);
    return new Response(JSON.stringify({ labels, pages, items: count }), {
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
 * @desc Deletes a label by id
 */
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    await checkSession();
    const params = await req.json();
    const { id } = params;
    if (!id) throw new Error(`Id is not defined`);
    await TaskLabel.findByIdAndDelete({ _id: id });
    return new Response(JSON.stringify({ message: `Label ${id} removed successfully` }), {
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
