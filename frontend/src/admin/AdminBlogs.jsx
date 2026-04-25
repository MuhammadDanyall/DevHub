import { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit, Trash2, X, FileText } from 'lucide-react';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', image: '', content: '' });
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    const { data } = await API.get('/blog');
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBlog) {
        await API.put(`/blog/${currentBlog._id}`, formData);
      } else {
        await API.post('/blog', formData);
      }
      setError('');
      fetchBlogs();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving blog post');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      await API.delete(`/blog/${id}`);
      fetchBlogs();
    }
  };

  const openModal = (blog = null) => {
    if (blog) {
      setCurrentBlog(blog);
      setFormData({ title: blog.title, content: blog.content, author: blog.author, image: blog.image });
    } else {
      setCurrentBlog(null);
      setFormData({ title: '', content: '', author: '', image: '' });
    }
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlog(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Blog Management</h2>
        <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
          <Plus size={20} /> New Post
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Article Title</th>
              <th className="p-4 font-semibold text-slate-700">Author</th>
              <th className="p-4 font-semibold text-slate-700">Image</th>
              <th className="p-4 font-semibold text-slate-700">Date</th>
              <th className="p-4 font-semibold text-slate-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium">{blog.title}</td>
                <td className="p-4 text-slate-600">{blog.author}</td>
                <td className="p-4 text-slate-500 text-sm">{blog.image ? 'Added' : 'Missing'}</td>
                <td className="p-4 text-slate-500 text-sm">{new Date(blog.date).toLocaleDateString()}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openModal(blog)} className="text-blue-600 hover:text-blue-800 p-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-800 p-2">
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
          <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{currentBlog ? 'Edit Post' : 'Create New Post'}</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            {error && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content (Markdown or Plain Text)</label>
                <textarea
                  required
                  rows="10"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-3 font-bold mt-4 shadow-lg shadow-accent/20">
                {currentBlog ? 'Update Post' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
