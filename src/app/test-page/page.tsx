import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-gray-800 p-4">
        <Link href="/" className="text-white hover:underline">
          Home
        </Link>
      </nav>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-500">Test Page</h1>
      </div>
    </div>
  );
}
