import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, FileText, MessageSquare, LogOut, ExternalLink, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();

  const menuItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Services', path: '/admin/dashboard/services', icon: <Briefcase size={20} /> },
    { name: 'Portfolio', path: '/admin/dashboard/portfolio', icon: <ExternalLink size={20} /> },
    { name: 'Blogs', path: '/admin/dashboard/blogs', icon: <FileText size={20} /> },
    { name: 'Inquiries', path: '/admin/dashboard/inquiries', icon: <MessageSquare size={20} /> },
    { name: 'Meetings', path: '/admin/dashboard/meetings', icon: <Calendar size={20} /> },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">DevelopersHub</p>
          <h1 className="text-2xl font-bold mt-2">Admin Suite</h1>
          <p className="text-sm text-slate-300 mt-3 truncate">{admin?.email}</p>
        </div>
        <nav className="flex-grow p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white text-primary' : 'hover:bg-white/10'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 flex items-center space-x-3 p-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-12">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
