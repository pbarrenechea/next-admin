import { NextRequest, NextResponse } from 'next/server';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/app/api/config';
import checkSession from '@/app/api/lib/checkSession';
import connectDB from '@/app/api/lib/db';
import Task from '@/app/api/models/task';
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
    // await checkSession();
    const { name, dueDate, labels, userId } = await req.json();
    const taskLabels = await TaskLabel.find({ _id: { $in: labels } });
    const newTaskLabel = new Task({
      name,
      ...(dueDate && { dueDate: new Date(dueDate) }),
      ...(taskLabels && {
        labels: taskLabels.map(({ _id, name, bgColor, fontColor }) => ({
          _id,
          bgColor,
          fontColor,
          title: name,
        })),
      }),
      user: userId,
    });
    await newTaskLabel.save();
    return NextResponse.json({ message: 'success', taskLabel: newTaskLabel });
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    // await checkSession();
    const { name, dueDate, labels, status, starred, userId, _id } = await req.json();
    const taskLabels = await TaskLabel.find({ _id: { $in: labels } });
    const newTaskLabel = await Task.findByIdAndUpdate(
      _id,
      {
        ...(name && { name }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(status && { status }),
        ...(typeof starred !== 'undefined' && { starred }),
        ...(taskLabels && {
          ...(labels && {
            labels: taskLabels.map(({ _id, name, bgColor, fontColor }) => ({
              _id,
              bgColor,
              fontColor,
              title: name,
            })),
          }),
        }),
        ...(userId && { user: userId }),
      },
      { new: true },
    );
    return NextResponse.json({ message: 'success', taskLabel: newTaskLabel });
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
    // await checkSession();
    const params = await req.json();
    const { id } = params;
    if (!id) throw new Error(`Id is not defined`);
    await Task.findByIdAndDelete({ _id: id });
    return new Response(JSON.stringify({ message: `Task ${id} removed successfully` }), {
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
 * @desc Returns all the tasks that belong to a user.
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
    //await checkSession();
    const page = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const pageSize = Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE;
    const userId = searchParams.get('userId');
    const tasks = await Task.find({ user: userId })
      .skip(page * pageSize)
      .limit(pageSize);
    const count = await Task.countDocuments({ user: userId });
    const pages = Math.ceil(count / pageSize);
    return new Response(JSON.stringify({ tasks, pages, items: count }), {
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
