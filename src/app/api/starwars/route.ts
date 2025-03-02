import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://swapi.dev/api/people/');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}