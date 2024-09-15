import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 p-4">
        <Link href="/test-page" className="text-white hover:underline mr-4">
          Test Page
        </Link>
        <Link href="/starwars" className="text-white hover:underline">
          Star Wars
        </Link>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Hello World</h1>
      </div>
    </div>
  );
}
