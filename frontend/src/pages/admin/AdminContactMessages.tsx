import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Calendar, User, X } from 'lucide-react';
import api from '../../lib/axios';
import { toJalaliLocale, toJalaliLocaleWithTime } from '../../lib/dateUtils';

interface ContactMessage {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const AdminContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/admin/contact-messages');
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      setError('خطا در دریافت پیام‌ها');
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('آیا از حذف این پیام مطمئن هستید؟')) return;

    try {
      await api.delete(`/admin/contact-messages/${id}`);
      setMessages(messages.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      setError('خطا در حذف پیام');
    }
  };

  const subjectLabels: Record<string, string> = {
    registration: 'ثبت‌نام',
    programs: 'برنامه‌ها',
    employment: 'استخدام',
    general: 'سایر موارد',
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-black text-ink">پیام‌های تماس با ما</h1>
        <span className="text-[13px] font-medium text-muted">{messages.length} پیام</span>
      </div>

      {error && (
        <div className="rounded-xl border border-error/20 bg-red-50 px-4 py-3 text-[13.5px] text-error">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white px-6 py-10 text-center text-[13.5px] text-muted">
          هنوز پیامی دریافت نشده است.
        </div>
      ) : (
        <>
          {/* Mobile: Card Layout */}
          <div className="lg:hidden space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-xl bg-white p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                      <User size={18} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{message.name}</h3>
                      <p className="text-sm text-gray-500">{subjectLabels[message.subject] || message.subject}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMessage(message)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="مشاهده"
                  >
                    <Mail size={16} />
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">تلفن:</span> {message.phone}</p>
                  {message.email && <p><span className="font-medium">ایمیل:</span> {message.email}</p>}
                  <p><span className="font-medium">تاریخ:</span> {toJalaliLocaleWithTime(message.created_at)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Two-column Layout */}
          <div className="hidden lg:grid gap-4 lg:grid-cols-[1fr_1.5fr]">
            {/* Messages List */}
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`cursor-pointer rounded-xl border bg-white p-4 transition hover:border-brand-light ${
                    selectedMessage?.id === message.id ? 'border-brand bg-brand-light' : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                        <User size={16} aria-hidden="true" />
                      </div>
                      <div className="mr-3 min-w-0 flex-1">
                        <p className="truncate text-[14px] font-bold text-ink">{message.name}</p>
                        <p className="mt-0.5 truncate text-[12px] text-muted">{message.subject}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] text-subtle">
                      {toJalaliLocale(message.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            {selectedMessage ? (
              <div className="rounded-xl border border-border bg-white p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-[18px] font-black text-ink">{selectedMessage.name}</h2>
                    <p className="mt-1 text-[13px] text-muted">{subjectLabels[selectedMessage.subject] || selectedMessage.subject}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-muted transition hover:border-error hover:text-error"
                    aria-label="حذف پیام"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[13px] text-muted">
                    <Phone size={14} aria-hidden="true" />
                    <span dir="ltr">{selectedMessage.phone}</span>
                  </div>
                  {selectedMessage.email && (
                    <div className="flex items-center gap-2 text-[13px] text-muted">
                      <Mail size={14} aria-hidden="true" />
                      <span>{selectedMessage.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-[13px] text-muted">
                    <Calendar size={14} aria-hidden="true" />
                    <span>{toJalaliLocaleWithTime(selectedMessage.created_at)}</span>
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-cream p-4">
                  <h3 className="mb-2 text-[13px] font-bold text-ink">پیام:</h3>
                  <p className="text-[14px] leading-7 text-muted whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-white px-6 py-10 text-center text-[13.5px] text-muted">
                یک پیام را برای مشاهده انتخاب کنید
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile Modal for Message Detail */}
      {selectedMessage && (
        <div className="lg:hidden fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">{selectedMessage.name}</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-500">{subjectLabels[selectedMessage.subject] || selectedMessage.subject}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} />
                  <span dir="ltr">{selectedMessage.phone}</span>
                </div>
                {selectedMessage.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span>{selectedMessage.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>{toJalaliLocaleWithTime(selectedMessage.created_at)}</span>
                </div>
              </div>

              <div className="rounded-xl bg-cream p-4 mb-4">
                <h3 className="mb-2 text-sm font-bold text-gray-800">پیام:</h3>
                <p className="text-sm leading-7 text-gray-600 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              >
                <Trash2 size={16} />
                حذف پیام
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
