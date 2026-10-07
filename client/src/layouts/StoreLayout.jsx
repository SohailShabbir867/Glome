import { Link, Outlet } from 'react-router-dom';

// Layout for all customer-facing pages (landing, explore, cart ...).
export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold tracking-tight text-brand">
            Glome
          </Link>
          <Link to="/login" className="text-sm font-medium text-muted hover:text-ink">
            Login
          </Link>
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-line py-6 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} Glome. All rights reserved.
      </footer>
    </div>
  );
}
