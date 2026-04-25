import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar as CalendarIcon, Clock, User, Mail, CheckCircle2 } from 'lucide-react';
import API from '../services/api';

const BookingModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientName: '', clientEmail: '', date: '', timeSlot: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Generate next 14 days
  const availableDates = useMemo(() => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Skip weekends
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  }, []);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '04:00 PM'];

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) {
        setBookedSlots([]);
        return;
      }

      setSlotsLoading(true);

      try {
        const { data } = await API.get(`/meetings/booked-slots?date=${formData.date}`);
        setBookedSlots(data);
      } catch (error) {
        setBookedSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    try {
      await API.post('/meetings', formData);
      setStatus({ loading: false, success: true, error: null });
      setTimeout(() => {
        onClose();
        setStep(1);
        setStatus({ loading: false, success: false, error: null });
        setFormData({ clientName: '', clientEmail: '', date: '', timeSlot: '' });
        setBookedSlots([]);
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus({ loading: false, success: false, error: err.response?.data?.message || 'Failed to book slot' });
    }
  };

  const handleClose = () => {
    setStep(1);
    setStatus({ loading: false, success: false, error: null });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={handleClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="bg-slate-50 p-6 md:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
            <div>
              <h2 className="text-2xl font-black text-primary">Schedule a Meeting</h2>
              <p className="text-slate-500 font-medium mt-1">Choose an available slot and reserve it instantly</p>
            </div>
            <button onClick={handleClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto">
            {status.success ? (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Meeting Confirmed!</h3>
                <p className="text-slate-500 text-lg">Your booking is recorded and the selected slot is now reserved.</p>
              </div>
            ) : status.error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-center font-medium mb-6">
                {status.error}
              </div>
            ) : null}

            {!status.success && (
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 block">Select a Date</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableDates.slice(0, 8).map(date => (
                          <button
                            type="button"
                            key={date}
                            onClick={() => setFormData({ ...formData, date, timeSlot: '' })}
                            className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${formData.date === date ? 'border-accent bg-accent/5 text-accent' : 'border-slate-100 text-slate-600 hover:border-slate-300'}`}
                          >
                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 block">Select a Time Slot</label>
                      {formData.date && (
                        <p className="text-xs text-slate-500">
                          {slotsLoading ? 'Checking availability...' : `${bookedSlots.length} reserved slot(s) on this date`}
                        </p>
                      )}
                      <div className="grid grid-cols-3 gap-3">
                        {timeSlots.map(time => {
                          const isBooked = bookedSlots.includes(time);

                          return (
                          <button
                            type="button"
                            key={time}
                            disabled={!formData.date || isBooked || slotsLoading}
                            onClick={() => setFormData({ ...formData, timeSlot: time })}
                            className={`p-3 rounded-xl border-2 transition-all font-bold text-sm flex items-center justify-center gap-2 ${
                              !formData.date || slotsLoading
                                ? 'opacity-50 cursor-not-allowed border-slate-100 bg-slate-50'
                                : isBooked
                                  ? 'cursor-not-allowed border-red-200 bg-red-50 text-red-500'
                                  : formData.timeSlot === time
                                    ? 'border-accent bg-accent/5 text-accent'
                                    : 'border-slate-100 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <Clock size={16} /> {isBooked ? `${time} Taken` : time}
                          </button>
                        )})}
                      </div>
                    </div>

                    <button 
                      type="button"
                      disabled={!formData.date || !formData.timeSlot}
                      onClick={() => setStep(2)}
                      className="w-full bg-primary hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mt-8"
                    >
                      Continue to Details
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10 mb-6 text-accent font-semibold">
                      <CalendarIcon size={20} />
                      {new Date(formData.date).toLocaleDateString()} at {formData.timeSlot}
                      <button type="button" onClick={() => setStep(1)} className="ml-auto text-sm underline hover:text-indigo-700">Change</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input type="text" name="clientName" required value={formData.clientName} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-medium" placeholder="Client Name" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input type="email" name="clientEmail" required value={formData.clientEmail} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-medium" placeholder="Client Email" />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={status.loading}
                      className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
                    >
                      {status.loading ? 'Scheduling...' : 'Confirm Meeting'}
                    </button>
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
