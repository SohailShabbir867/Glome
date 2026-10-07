import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center text-center">
      <div>
        <h1 className="text-6xl font-bold text-brand">404</h1>
        <p className="mt-2 text-muted">This page does not exist.</p>
        <Link to="/" className="mt-6 inline-block font-medium text-accent hover:underline">
          Back to Glome
        </Link>
      </div>
    </main>
  );
}
