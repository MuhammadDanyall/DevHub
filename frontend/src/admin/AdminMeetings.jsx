import { useState, useEffect } from 'react';
import API from '../services/api';
import { Calendar, Clock, User, Mail, FileText, CheckCircle, XCircle } from 'lucide-react';

const AdminMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeetings = async () => {
    try {
      const { data } = await API.get('/meetings');
      setMeetings(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching meetings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/meetings/${id}`, { status });
      fetchMeetings();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const deleteMeeting = async (id) => {
    if (window.confirm("Are you sure you want to delete this meeting trace?")) {
      try {
        await API.delete(`/meetings/${id}`);
        fetchMeetings();
      } catch (err) {
        console.error('Delete failed', err);
      }
    }
  };

  if (loading) return <div className="text-xl p-8 font-semibold animate-pulse">Loading Meetings...</div>;
  if (error) return <div className="text-xl text-red-500 p-8">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar className="text-accent" /> Scheduled Meetings
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Client Details</th>
              <th className="p-4 font-semibold">Date & Time</th>
              <th className="p-4 font-semibold">Topic</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {meetings.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-slate-500">No meetings scheduled yet.</td></tr>
            ) : (
              meetings.map((meeting) => (
                <tr key={meeting._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold mb-1">
                      <User size={16} className="text-slate-400" /> {meeting.clientName}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Mail size={16} className="text-slate-400" /> {meeting.clientEmail}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-800 mb-1">
                      <Calendar size={16} className="text-accent" /> {meeting.date}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Clock size={16} className="text-slate-400" /> {meeting.timeSlot}
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    <div className="flex items-start gap-2 max-w-xs">
                      <FileText size={16} className="text-slate-400 mt-0.5 shrink-0" />
                      <span>Reserved consultation slot</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      meeting.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      meeting.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                      meeting.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {meeting.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {meeting.status === 'Pending' && (
                      <button onClick={() => updateStatus(meeting._id, 'Confirmed')} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Confirm">
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {meeting.status === 'Confirmed' && (
                      <button onClick={() => updateStatus(meeting._id, 'Completed')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Mark Completed">
                        <CheckCircle size={20} />
                      </button>
                    )}
                    {(meeting.status === 'Pending' || meeting.status === 'Confirmed') && (
                      <button onClick={() => updateStatus(meeting._id, 'Cancelled')} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Cancel">
                        <XCircle size={20} />
                      </button>
                    )}
                    <button onClick={() => deleteMeeting(meeting._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMeetings;
