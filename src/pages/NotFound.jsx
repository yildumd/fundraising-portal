import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}