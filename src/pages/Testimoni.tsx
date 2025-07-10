import { Component, createSignal, onMount, For } from 'solid-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  avatar: string;
  bgColor: string;
}

interface Statistic {
  value: string;
  label: string;
  color: string;
}

const TestimoniTabungin: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sari Amelia",
      role: "Ibu Rumah Tangga",
      rating: 5,
      content: "Sebelum pakai Tabungin, aku selalu boros dan susah nabung. Sekarang dengan fitur target otomatis dan berurat nabung sejumlah dalam 6 bulan. Game changer banget!",
      avatar: "SA",
      bgColor: "bg-teal-500"
    },
    {
      id: 2,
      name: "Budi Prasetyo",
      role: "Karyawan Swasta",
      rating: 5,
      content: "Aplikasinya simple banget, cocok buat yang gaptek kayak aku. Fitur reminder membantu banget buat konsisten nabung setiap hari. Recommended!",
      avatar: "BP",
      bgColor: "bg-emerald-600"
    },
    {
      id: 3,
      name: "Linda Kusuma",
      role: "Ibu Rumah Tangga, Surabaya",
      rating: 5,
      content: "Anak-anak jadi lebih disiplin nabung setelah pakai Tabungin. Mereka suka sama visualisasi target yang lucu dan mudah dipahami. Terima kasih Tabungin!",
      avatar: "LK",
      bgColor: "bg-green-600"
    },
    {
      id: 4,
      name: "Umar Said",
      role: "Pegawai Negeri",
      rating: 5,
      content: "Dulu aku pikir nabung itu susah dan membosankan. Tabungin bikin nabung jadi fun dengan sistem poin dan achievement. Sekarang malah ketagihan nabung!",
      avatar: "US",
      bgColor: "bg-teal-600"
    }
  ];

  const statistics: Statistic[] = [
    { value: "50k+", label: "Pengguna Aktif", color: "text-emerald-600" },
    { value: "5.0", label: "Rating App Store", color: "text-emerald-600" },
    { value: "15M+", label: "Total Tabungan Terkumpul", color: "text-emerald-600" },
    { value: "95%", label: "Target Tercapai", color: "text-emerald-600" }
  ];

  onMount(() => {
    setTimeout(() => setIsVisible(true), 200);
  });

  const StarRating = (props: { rating: number }) => {
    return (
      <div class="flex gap-1 mb-3">
        <For each={Array(5).fill(0)}>
          {(_, index) => (
            <svg
              class={`w-4 h-4 ${index() < props.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
        </For>
      </div>
    );
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Apa Kata Pengguna Tabungin?
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ribuan orang sudah merasakan manfaat menabung dengan Tabungin
          </p>
        </div>

        {/* Testimonials Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <For each={testimonials}>
            {(testimonial, index) => (
              <div
                class={`
                  bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2
                  ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={`transition-delay: ${index() * 150}ms`}
              >
                <StarRating rating={testimonial.rating} />

                <p class="text-gray-700 text-lg leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                <div class="flex items-center gap-4">
                  <div class={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 class="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </h4>
                    <p class="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Statistics Section */}
        <div class="bg-white rounded-3xl shadow-2xl p-12 mb-20">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Dipercaya Ribuan Pengguna!!!
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <For each={statistics}>
              {(stat, index) => (
                <div
                  class={`
                    text-center transform transition-all duration-700
                    ${isVisible() ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                  `}
                  style={`transition-delay: ${index() * 100 + 800}ms`}
                >
                  <div class={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div class="text-gray-600 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Call to Action */}
        <div class="text-center">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto text-white">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              Bergabunglah dengan Ribuan Pengguna Lainnya!
            </h2>
            <p class="text-xl mb-8 opacity-90">
              Mulai perjalanan finansial yang lebih baik bersama Tabungin
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/Download"
                class="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Download Sekarang
              </a>
              <a
                href="/CaraKerja"
                class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 text-center"
              >
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TestimoniTabungin;
