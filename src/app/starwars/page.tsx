'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

interface PeopleResponse {
  results: Person[];
}

const fetchPeople = async (): Promise<PeopleResponse> => {
  const res = await fetch('/api/starwars');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

export default function StarWars() {
  const [filter, setFilter] = useState('');
  const { data, isLoading, error } = useQuery<PeopleResponse, Error>({
    queryKey: ['starWarsPeople'],
    queryFn: fetchPeople,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const filteredPeople = data?.results.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <nav className="bg-gray-800 p-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
      </nav>
      <div className="flex-grow p-8">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Star Wars Characters
        </h1>
        <input
          type="text"
          placeholder="Filter characters..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <ul className="space-y-4">
          {filteredPeople?.map((person, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg text-black">
              <h2 className="text-xl font-semibold">{person.name}</h2>
              <p>Height: {person.height} cm</p>
              <p>Mass: {person.mass} kg</p>
              <p>Birth Year: {person.birth_year}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
