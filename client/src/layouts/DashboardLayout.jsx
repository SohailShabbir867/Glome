import { Outlet } from 'react-router-dom';

// Shared shell for the Sales and Admin dashboards.
// Pass a different `title` and (later) a different menu for each role.
export default function DashboardLayout({ title }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 bg-brand-dark p-6 text-white">
        <p className="text-xl font-bold">Glome</p>
        <p className="mt-1 text-sm text-white/60">{title}</p>
        {/* Sidebar menu goes here */}
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
