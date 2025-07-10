import { Component, createSignal, For } from 'solid-js';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  content: string;
  ratingBadge: string;
}

interface RatingDistribution {
  stars: number;
  count: number;
  percentage: number;
}

const Testimonial: Component = () => {
  const [sortBy, setSortBy] = createSignal('Semua Rating');
  const [activeMenu, setActiveMenu] = createSignal('Testimoni');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Umar Said',
      avatar: '👤',
      rating: 5,
      content: 'Sebelum pakai Tabungin, aku selalu boros dan susah nabung. Sekarang dengan fitur target otomatis, aku berhasil nabung 5 juta dalam 6 bulan! Game changer banget!',
      ratingBadge: '⭐⭐⭐⭐⭐'
    },
    {
      id: '2',
      name: 'Albertus Cristian',
      avatar: '👤',
      rating: 4,
      content: 'Aplikasinya simple banget, cocok buat yang gaptek kayak aku. Fitur pengingat otomatisnya bikin aku konsisten nabung setiap hari. Recommended!',
      ratingBadge: '⭐⭐⭐⭐'
    },
    {
      id: '3',
      name: 'Alfazri Maulana',
      avatar: '👤',
      rating: 5,
      content: 'Anak-anak jadi lebih disiplin nabung setelah pakai Tabungin. Mereka suka sama visualisasi target yang lucu dan mudah dipahami. Terima kasih Tabungin!',
      ratingBadge: '⭐⭐⭐⭐⭐'
    }
  ];

  const ratingDistribution: RatingDistribution[] = [
    { stars: 5, count: 953, percentage: 85 },
    { stars: 4, count: 172, percentage: 15 },
    { stars: 3, count: 61, percentage: 8 },
    { stars: 2, count: 19, percentage: 3 },
    { stars: 1, count: 9, percentage: 1 }
  ];

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);
  const averageRating = 4.8;

  const getProgressBarColor = (stars: number) => {
    if (stars >= 4) return 'bg-green-500';
    if (stars === 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Sidebar - fixed */}
      <div class="w-64 fixed top-0 left-0 h-screen z-10 bg-white border-r border-gray-200">
        <Sidebar activeMenu={activeMenu()} setActiveMenu={setActiveMenu} />
      </div>

      {/* Main Content - shifted right with margin */}
      <div class="ml-64 flex flex-col min-h-screen">
        <NavbarDashboard />

        <main class="flex-1 p-6">
          {/* Header */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-800">Dashboard Testimoni</h1>
              <div class="flex items-center space-x-8">
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-800">5.0</div>
                  <div class="text-sm text-gray-600">Rata-rata Rating</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-gray-800">1,247</div>
                  <div class="text-sm text-gray-600">Total Review</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Testimonials */}
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-lg font-semibold text-gray-800">Testimoni Terbaru</h2>
                  <select
                    aria-label="Urutkan Berdasarkan"
                    class="border rounded px-2 py-1 text-sm"
                    value={sortBy()}
                    onInput={(e) => setSortBy(e.currentTarget.value)}
                  >
                    <option value="Semua Rating">Semua Rating</option>
                    <option value="5 Bintang">5 Bintang</option>
                    <option value="4 Bintang">4 Bintang</option>
                    <option value="3 Bintang">3 Bintang</option>
                  </select>
                </div>

                <div class="space-y-4">
                  <For each={testimonials.filter((t) => {
                    if (sortBy() === 'Semua Rating') return true;
                    const rating = parseInt(sortBy().charAt(0));
                    return t.rating === rating;
                  })}>
                    {(testimonial) => (
                      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div class="flex items-start space-x-3">
                          <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div class="flex-1">
                            <div class="flex items-center justify-between mb-2">
                              <h3 class="font-medium text-gray-800">{testimonial.name}</h3>
                              <div class="flex items-center space-x-2">
                                <span class="text-sm text-yellow-600">{testimonial.ratingBadge}</span>
                                <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                  {testimonial.rating}.0
                                </span>
                              </div>
                            </div>
                            <p class="text-gray-600 text-sm leading-relaxed">
                              "{testimonial.content}"
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>

            {/* Statistic Cards */}
            <div class="space-y-6">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div class="text-6xl mb-2">⭐</div>
                <div class="text-3xl font-bold text-gray-800 mb-1">{averageRating}</div>
                <div class="text-sm text-gray-600">Rating Rata-rata</div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div class="text-6xl mb-2">📝</div>
                <div class="text-3xl font-bold text-gray-800 mb-1">{totalReviews.toLocaleString()}</div>
                <div class="text-sm text-gray-600">Total Review</div>
              </div>

              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <div class="text-6xl mb-2">👍</div>
                <div class="text-3xl font-bold text-gray-800 mb-1">82%</div>
                <div class="text-sm text-gray-600">Review Positif</div>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div class="mt-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">Distribusi Rating</h2>
              <div class="space-y-4">
                <For each={ratingDistribution}>
                  {(item) => (
                    <div class="flex items-center space-x-4">
                      <div class="flex items-center space-x-2 w-12">
                        <span class="font-medium text-gray-700">{item.stars}</span>
                        <span class="text-yellow-500">⭐</span>
                      </div>
                      <div class="flex-1">
                        <div class="w-full bg-gray-200 rounded-full h-3">
                          <div
                            class={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(item.stars)}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div class="text-sm text-gray-600 w-8 text-right">{item.count}</div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Testimonial;
