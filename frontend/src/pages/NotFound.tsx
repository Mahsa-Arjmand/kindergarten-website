import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="bg-cream">
    <section className="container-hedieh py-20 text-center lg:py-28">
      <p className="section-kicker">خطای ۴۰۴</p>
      <h1 className="mt-2 text-[30px] font-black leading-[1.35] text-ink sm:text-[38px]">
        صفحه‌ای که دنبالش بودید پیدا نشد
      </h1>
      <p className="mx-auto mt-4 max-w-[460px] text-[15px] leading-7 text-muted">
        ممکن است نشانی را اشتباه وارد کرده باشید یا صفحه جابه‌جا شده باشد. از لینک‌های زیر ادامه دهید.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="rounded-xl bg-brand px-5 py-3 text-[14px] font-bold text-white transition hover:opacity-90">
          بازگشت به صفحه اصلی
        </Link>
        <Link to="/registration" className="rounded-xl border border-border bg-white px-5 py-3 text-[14px] font-bold text-ink transition hover:bg-cream">
          ثبت‌نام آنلاین
        </Link>
        <Link to="/contact" className="rounded-xl border border-border bg-white px-5 py-3 text-[14px] font-bold text-ink transition hover:bg-cream">
          تماس با ما
        </Link>
      </div>
    </section>
  </div>
);

export default NotFound;
