import { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', iconUrl: '' });

  const fetchServices = async () => {
    const { data } = await API.get('/services');
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentService) {
        await API.put(`/services/${currentService._id}`, formData);
      } else {
        await API.post('/services', formData);
      }
      fetchServices();
      closeModal();
    } catch (err) {
      alert('Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await API.delete(`/services/${id}`);
      fetchServices();
    }
  };

  const openModal = (service = null) => {
    if (service) {
      setCurrentService(service);
      setFormData({ title: service.title, description: service.description, iconUrl: service.iconUrl });
    } else {
      setCurrentService(null);
      setFormData({ title: '', description: '', iconUrl: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Manage Services</h2>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add New Service
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Title</th>
              <th className="p-4 font-semibold text-slate-700">Description</th>
              <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{service.title}</td>
                <td className="p-4 text-slate-600 max-w-md truncate">{service.description}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openModal(service)} className="text-blue-600 hover:text-blue-800 p-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-800 p-2">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{currentService ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  required
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Icon URL</label>
                <input
                  type="text"
                  required
                  value={formData.iconUrl}
                  onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-3 font-bold mt-4">
                {currentService ? 'Update Service' : 'Create Service'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
