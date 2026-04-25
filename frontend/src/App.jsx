import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminServices from './admin/AdminServices';
import AdminInquiries from './admin/AdminInquiries';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminBlogs from './admin/AdminBlogs';
import AdminMeetings from './admin/AdminMeetings';
import Navbar from './components/Navbar';
import PortfolioUser from './pages/PortfolioUser';
import BlogUser from './pages/BlogUser';
import BlogDetail from './pages/BlogDetail';
import ServiceDetail from './pages/ServiceDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import { LayoutDashboard, Users, Calendar, Briefcase, FileText } from 'lucide-react';
import API from './services/api';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Leads', value: stats?.totalLeads ?? 0, icon: <Users size={24} className="text-emerald-500" />, color: 'bg-emerald-50' },
    { title: 'Active Meetings', value: stats?.activeMeetings ?? 0, icon: <Calendar size={24} className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Services', value: stats?.totalServices ?? 0, icon: <Briefcase size={24} className="text-amber-500" />, color: 'bg-amber-50' },
    { title: 'Published Blogs', value: stats?.totalBlogs ?? 0, icon: <FileText size={24} className="text-indigo-500" />, color: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-primary">Stats Overview</h1>
          <p className="text-slate-500 mt-2">Track leads, meetings, and content health across the platform.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <LayoutDashboard className="text-accent" size={22} />
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Portfolio Items</p>
            <p className="text-lg font-bold text-primary">{stats?.totalProjects ?? 0}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`${stat.color} p-4 rounded-xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase">{stat.title}</p>
              <h3 className="text-2xl font-black text-primary mt-1">
                {loading ? <span className="inline-block h-8 w-20 animate-pulse rounded bg-slate-200" /> : stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-primary mb-4">Agency Excellence Platform</h2>
        <p className="text-slate-600 text-lg">
          Manage service offerings, portfolio proof, editorial content, inbound inquiries, and meeting reservations from one secure admin suite.
        </p>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Layout */}
            <Route path="/" element={<><Navbar /><Home /></>} />
            <Route path="/portfolio" element={<><Navbar /><PortfolioUser /></>} />
            <Route path="/blog" element={<><Navbar /><BlogUser /></>} />
            <Route path="/blog/:id" element={<><Navbar /><BlogDetail /></>} />
            <Route path="/services/:id" element={<><Navbar /><ServiceDetail /></>} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            
            {/* Admin Portal */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Navigate to="/admin/dashboard" replace />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="meetings" element={<AdminMeetings />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
