import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import api from '../lib/axios';
import { Faq as FaqType } from '../types';

const Faq = () => {
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'سوالات متداول - مهدکودک هدیه';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'پاسخ سوالات متداول درباره ثبت‌نام، برنامه‌ها و خدمات مهدکودک هدیه');

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
    <main className="bg-cream">
      <section className="border-b border-border-light bg-cream">
        <div className="container-hedieh py-10 lg:py-12">
          <p className="section-kicker">راهنمای والدین</p>
          <h1 className="max-w-[560px] text-balance text-[30px] font-black leading-[1.35] tracking-[-0.03em] text-ink sm:text-[38px] lg:text-[42px]">
            سؤالاتی که
            <span className="text-brand-dark"> بیشتر پرسیده می‌شوند.</span>
          </h1>
          <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-muted">
            پاسخ برخی از پرسش‌های رایج درباره مهدکودک هدیه را اینجا پیدا کنید.
          </p>
        </div>
      </section>

      <section className="bg-warm-white py-8 lg:py-10">
        <div className="container-hedieh">
          {loading ? (
            <div className="flex min-h-[280px] items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-brand-light border-t-brand-dark" />
            </div>
          ) : faqs.length === 0 ? (
            <div className="mx-auto max-w-[640px] rounded-xl border border-dashed border-border bg-white px-4 py-10 text-center text-[13.5px] text-muted">
              هنوز سؤالی ثبت نشده است.
            </div>
          ) : (
            <div className="mx-auto max-w-[720px] overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.id} className="border-b border-border-light last:border-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-5 text-right transition hover:bg-cream/50 sm:px-6"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-brand-dark">
                        <HelpCircle size={17} aria-hidden="true" />
                      </span>
                      <span className="flex-1 text-[14px] font-bold leading-7 text-ink sm:text-[15px]">
                        {faq.question}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-white text-ink">
                        {isOpen ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pr-[68px] sm:px-6 sm:pr-[76px]">
                        <p className="rounded-xl bg-cream px-4 py-3 text-[13.5px] leading-7 text-muted">
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
