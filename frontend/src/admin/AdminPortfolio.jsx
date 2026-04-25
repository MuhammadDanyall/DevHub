import { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({ projectName: '', image: '', techStack: '', link: '' });
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    const { data } = await API.get('/portfolio');
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map((tech) => tech.trim()).filter(Boolean),
      };

      if (currentProject) {
        await API.put(`/portfolio/${currentProject._id}`, payload);
      } else {
        await API.post('/portfolio', payload);
      }
      setError('');
      fetchProjects();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving project');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await API.delete(`/portfolio/${id}`);
      fetchProjects();
    }
  };

  const openModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setFormData({
        projectName: project.projectName,
        image: project.image,
        techStack: project.techStack.join(', '),
        link: project.link,
      });
    } else {
      setCurrentProject(null);
      setFormData({ projectName: '', image: '', techStack: '', link: '' });
    }
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Portfolio Gallery</h2>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-2xl shadow-sm border overflow-hidden group">
            <div className="relative aspect-video bg-slate-100">
              <img src={project.image || 'https://via.placeholder.com/400x300'} alt={project.projectName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={() => openModal(project)} className="bg-white text-primary p-3 rounded-full hover:bg-accent hover:text-white transition-all">
                  <Edit size={20} />
                </button>
                <button onClick={() => handleDelete(project._id)} className="bg-white text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">{project.techStack?.slice(0, 2).join(' • ')}</span>
              <h3 className="text-xl font-bold mt-1">{project.projectName}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{project.link}</p>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full py-20 bg-white rounded-2xl border border-dashed text-slate-400 text-center">
            No projects added yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{currentProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            {error && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Link</label>
                <input
                  type="url"
                  required
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://project.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <div className="flex gap-2">
                  <div className="flex-grow">
                  <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border shrink-0">
                    <ImageIcon className="text-slate-400" size={20} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack</label>
                <input
                  type="text"
                  required
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-3 font-bold mt-4 shadow-lg shadow-accent/20">
                {currentProject ? 'Save Changes' : 'Publish Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
