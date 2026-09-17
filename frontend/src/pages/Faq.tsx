import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import api from '../lib/axios';
import { Faq as FaqType } from '../types';

document.title = 'سوالات متداول - مهدکودک هدیه';

document
  .querySelector('meta[name="description"]')
  ?.setAttribute(
    'content',
    'پاسخ سوالات متداول درباره ثبت‌نام، برنامه‌ها و خدمات مهدکودک هدیه'
  );

const Faq = () => {
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get('/faqs');
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-cream">
      <section className="border-b border-border bg-cream">
        <div className="container-hedieh py-16 sm:py-20">
          <p className="mb-4 text-sm font-bold text-brand">
            راهنمای والدین
          </p>

          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.4] text-ink sm:text-5xl">
            سؤالاتی که
            <span className="text-brand"> بیشتر پرسیده می‌شوند.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
            پاسخ برخی از پرسش‌های رایج درباره مهدکودک هدیه را اینجا پیدا
            کنید.
          </p>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-light border-t-brand" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="border border-dashed border-border py-16 text-center text-muted">
              هنوز سؤالی ثبت نشده است.
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.id}
                    className="border-b border-border first:border-t"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-5 py-6 text-right"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand">
                        <HelpCircle size={19} />
                      </div>

                      <span className="flex-1 text-sm font-bold leading-7 text-ink sm:text-base">
                        {faq.question}
                      </span>

                      <span className="shrink-0 text-brand">
                        {isOpen ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="mr-[60px] pb-6 pl-2">
                        <p className="text-sm leading-8 text-muted">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Faq;