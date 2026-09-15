import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { Gallery } from '../types';

const Gallery = () => {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'همه' },
    { value: 'environment', label: 'محیط کودکستان' },
    { value: 'classes', label: 'کلاس‌ها' },
    { value: 'activities', label: 'فعالیت‌ها' },
    { value: 'celebrations', label: 'جشن‌ها' },
    { value: 'trips', label: 'اردوها' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery', {
          params: filter !== 'all' ? { category: filter } : {},
        });
        setGallery(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [filter]);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">گالری تصاویر</h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === category.value
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {gallery.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p>تصویری در این دسته‌بندی وجود ندارد.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={`http://localhost:8000/storage/${item.image_path}`}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
