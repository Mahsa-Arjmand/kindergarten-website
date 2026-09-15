// SEO metadata for About page
document.title = 'درباره ما - کودکستان هدیه';
document.querySelector('meta[name="description"]')?.setAttribute('content', 'آشنایی با کودکستان هدیه - بیش از ۱۰ سال تجربه در آموزش و پرورش کودکان با محیطی امن و شاد');

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">درباره ما</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            کودکستان هدیه با بیش از ۱۰ سال تجربه در حوزه آموزش و پرورش کودکان، با بهره‌گیری از
            مربیان متخصص و محیطی امن و شاد، تلاش می‌کند تا بهترین تجربه آموزشی را برای کودکان شما
            فراهم کند.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            رویکرد ما بر پایه احترام به فردیت هر کودک و توجه به نیازهای خاص او استوار است. ما معتقدیم
            که هر کودک با استعدادهای منحصر به فرد خود deserves فرصتی برای شکوفایی.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">چشم‌انداز ما</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            تبدیل شدن به یکی از برترین کودکستان‌های کشور با ارائه خدمات آموزشی با کیفیت و محیطی
            امن برای رشد همه‌جانبه کودکان.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ارزش‌های ما</h2>
          <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
            <li>احترام به فردیت هر کودک</li>
            <li>ایجاد محیط امن و شاد</li>
            <li>آموزش با کیفیت و روش‌های نوین</li>
            <li>ارتباط موثر با والدین</li>
            <li>تیم آموزشی متخصص و دلسوز</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
