import { useState, useEffect } from 'react';
import API from '../services/api';
import { Trash2, Mail, User, BookOpen } from 'lucide-react';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    const { data } = await API.get('/inquiries');
    setInquiries(data);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await API.delete(`/inquiries/${id}`);
      fetchInquiries();
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/inquiries/${id}`, { status });
    fetchInquiries();
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary">Inquiry Inbox</h2>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inquiry) => (
          <div key={inquiry._id} className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-all">
            <div className="space-y-4 flex-grow">
              <div className="flex flex-wrap gap-4 text-sm font-medium">
                <div className="flex items-center gap-2 text-primary">
                  <User size={16} /> {inquiry.name}
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail size={16} /> {inquiry.email}
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <BookOpen size={16} /> {inquiry.subject}
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {inquiry.message}
              </p>
              <div className="text-xs text-slate-400">
                Received on: {new Date(inquiry.createdAt).toLocaleString()}
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                  inquiry.status === 'Replied' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {inquiry.status}
                </span>
                {inquiry.status !== 'Replied' && (
                  <button
                    onClick={() => updateStatus(inquiry._id, 'Replied')}
                    className="text-sm font-semibold text-accent hover:text-indigo-700"
                  >
                    Mark Replied
                  </button>
                )}
              </div>
            </div>
            <div className="flex md:flex-col justify-end">
              <button
                onClick={() => handleDelete(inquiry._id)}
                className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                title="Delete Inquiry"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        {inquiries.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed text-slate-400">
            No inquiries yet. When clients contact you, they will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
