import axios from 'axios';

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'Huddle01-Test',
        roomLock: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.HUDDLE_API_KEY,
        },
      }
    );
    return NextResponse.json(data, { status: 200 });
    // res.status(200).json(data);
  } catch (error) {
    console.log('API', { error });

    return NextResponse.json(error, { status: 500 });
  }
}

// export  {handler as GET, handler as POST}
