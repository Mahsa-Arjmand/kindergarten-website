import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Calendar, User } from 'lucide-react';
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
        <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
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
      )}
    </div>
  );
};

export default AdminContactMessages;
