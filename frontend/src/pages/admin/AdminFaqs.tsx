import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { Plus, Edit, Trash2, Search, X, ChevronUp, ChevronDown } from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

const AdminFaqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    is_active: true,
    order: 0,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await api.get('/admin/faqs');
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        question: formData.question,
        answer: formData.answer,
        is_active: formData.is_active ? 1 : 0,
        order: formData.order,
      };

      if (editingFaq) {
        await api.put(`/admin/faqs/${editingFaq.id}`, data);
      } else {
        await api.post('/admin/faqs', data);
      }

      closeModal();
      fetchFaqs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این سوال را حذف کنید؟')) {
      try {
        await api.delete(`/admin/faqs/${id}`);
        fetchFaqs();
      } catch (error: any) {
        console.error('Error deleting FAQ:', error);
        if (error.response?.data?.message) {
          alert('خطا در حذف سوال: ' + error.response.data.message);
        } else {
          alert('خطا در حذف سوال: ' + error.message);
        }
      }
    }
  };

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      await api.put(`/admin/faqs/${id}`, { is_active: isActive ? 1 : 0 });
      fetchFaqs();
    } catch (error) {
      console.error('Error toggling FAQ status:', error);
    }
  };

  const moveOrder = async (id: number, direction: 'up' | 'down') => {
    const currentIndex = faqs.findIndex(f => f.id === id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= faqs.length) return;

    const currentFaq = faqs[currentIndex];
    const targetFaq = faqs[targetIndex];

    try {
      await api.put(`/admin/faqs/${currentFaq.id}`, { order: targetFaq.order });
      await api.put(`/admin/faqs/${targetFaq.id}`, { order: currentFaq.order });
      fetchFaqs();
    } catch (error) {
      console.error('Error moving FAQ:', error);
    }
  };

  const openModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        is_active: faq.is_active,
        order: faq.order,
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        is_active: true,
        order: faqs.length,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      is_active: true,
      order: 0,
    });
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت سوالات متداول</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus size={16} />
            افزودن سوال
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">ترتیب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">سوال</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">پاسخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">وضعیت</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  هیچ سوالی یافت نشد
                </td>
              </tr>
            ) : (
              filteredFaqs.map((faq, index) => (
                <tr key={faq.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveOrder(faq.id, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <span className="text-sm font-medium text-gray-800">{faq.order + 1}</span>
                      <button
                        onClick={() => moveOrder(faq.id, 'down')}
                        disabled={index === filteredFaqs.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{faq.question}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{faq.answer}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(faq.id, !faq.is_active)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        faq.is_active 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {faq.is_active ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => openModal(faq)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingFaq ? 'ویرایش سوال' : 'افزودن سوال جدید'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">سوال</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">پاسخ</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32"
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-600">فعال</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">ترتیب نمایش</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {editingFaq ? 'ذخیره تغییرات' : 'افزودن'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqs;
