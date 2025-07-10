import { Component, createSignal, For } from 'solid-js';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

interface Notification {
  id: number;
  type: 'transaction' | 'savings' | 'investment' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
  amount?: string;
  icon: string;
}

const Notifications: Component = () => {
  const [activeFilter, setActiveFilter] = createSignal('all');
    const [activeMenu, setActiveMenu] = createSignal('Notifikasi');
  const [notifications, setNotifications] = createSignal<Notification[]>([
    {
      id: 1,
      type: 'transaction',
      title: 'Transaksi Berhasil',
      message: 'Transfer ke rekening BCA *1234 berhasil diproses',
      timestamp: '2 menit yang lalu',
      isRead: false,
      priority: 'high',
      amount: 'Rp 500.000',
      icon: '💳'
    },
    {
      id: 2,
      type: 'savings',
      title: 'Target Tabungan Tercapai',
      message: 'Selamat! Anda telah mencapai target tabungan untuk liburan',
      timestamp: '1 jam yang lalu',
      isRead: false,
      priority: 'high',
      amount: 'Rp 10.000.000',
      icon: '🎯'
    },
    {
      id: 3,
      type: 'investment',
      title: 'Portofolio Naik 5%',
      message: 'Investasi saham Anda mengalami kenaikan hari ini',
      timestamp: '3 jam yang lalu',
      isRead: true,
      priority: 'medium',
      amount: '+Rp 250.000',
      icon: '📈'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Pengingat Tagihan',
      message: 'Tagihan kartu kredit jatuh tempo dalam 3 hari',
      timestamp: '5 jam yang lalu',
      isRead: false,
      priority: 'medium',
      amount: 'Rp 1.500.000',
      icon: '⏰'
    },
    {
      id: 5,
      type: 'system',
      title: 'Pembaruan Keamanan',
      message: 'Sistem keamanan Tabungin telah diperbarui',
      timestamp: '1 hari yang lalu',
      isRead: true,
      priority: 'low',
      icon: '🔒'
    },
    {
      id: 6,
      type: 'transaction',
      title: 'Pembayaran Diterima',
      message: 'Gaji bulanan telah masuk ke rekening utama',
      timestamp: '1 hari yang lalu',
      isRead: true,
      priority: 'high',
      amount: 'Rp 8.500.000',
      icon: '💰'
    },
    {
      id: 7,
      type: 'savings',
      title: 'Tabungan Otomatis',
      message: 'Tabungan otomatis Rp 500.000 berhasil dipotong',
      timestamp: '2 hari yang lalu',
      isRead: true,
      priority: 'medium',
      amount: 'Rp 500.000',
      icon: '🏦'
    },
    {
      id: 8,
      type: 'investment',
      title: 'Rekomendasi Investasi',
      message: 'Ada produk investasi baru yang cocok untuk profil risiko Anda',
      timestamp: '3 hari yang lalu',
      isRead: false,
      priority: 'low',
      icon: '💡'
    }
  ]);

  const filters = [
    { key: 'all', label: 'Semua', count: notifications().length },
    { key: 'unread', label: 'Belum Dibaca', count: notifications().filter(n => !n.isRead).length },
    { key: 'transaction', label: 'Transaksi', count: notifications().filter(n => n.type === 'transaction').length },
    { key: 'savings', label: 'Tabungan', count: notifications().filter(n => n.type === 'savings').length },
    { key: 'investment', label: 'Investasi', count: notifications().filter(n => n.type === 'investment').length },
    { key: 'reminder', label: 'Pengingat', count: notifications().filter(n => n.type === 'reminder').length }
  ];

  const filteredNotifications = () => {
    const filter = activeFilter();
    if (filter === 'all') return notifications();
    if (filter === 'unread') return notifications().filter(n => !n.isRead);
    return notifications().filter(n => n.type === filter);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-200 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-200 text-green-800';
      default: return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction': return 'bg-blue-500';
      case 'savings': return 'bg-green-500';
      case 'investment': return 'bg-purple-500';
      case 'reminder': return 'bg-orange-500';
      case 'system': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="w-64 fixed top-0 left-0 h-screen z-10 bg-white border-r border-gray-200">
        <Sidebar activeMenu={activeMenu()} setActiveMenu={setActiveMenu} />
      </div>
      <div class="ml-64 flex flex-col min-h-screen">
        <NavbarDashboard />

      {/* Header Section */}
      <section class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Notifikasi
            </h1>
            <p class="text-lg text-gray-600">
              Pantau semua aktivitas dan update terbaru akun Anda
            </p>
          </div>
          <div class="flex gap-3">
            <button 
              onClick={markAllAsRead}
              class="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Tandai Semua Dibaca
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Total Notifikasi</p>
                <p class="text-2xl font-bold text-gray-800">{notifications().length}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">📬</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Belum Dibaca</p>
                <p class="text-2xl font-bold text-red-600">{notifications().filter(n => !n.isRead).length}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">🔴</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Prioritas Tinggi</p>
                <p class="text-2xl font-bold text-orange-600">{notifications().filter(n => n.priority === 'high').length}</p>
              </div>
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">⚠️</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Hari Ini</p>
                <p class="text-2xl font-bold text-green-600">{notifications().filter(n => n.timestamp.includes('menit') || n.timestamp.includes('jam')).length}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">📅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex flex-wrap gap-2">
            <For each={filters}>
              {(filter) => (
                <button
                  onClick={() => setActiveFilter(filter.key)}
                  class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter() === filter.key
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                  {filter.count > 0 && (
                    <span class={`ml-2 px-2 py-1 rounded-full text-xs ${
                      activeFilter() === filter.key
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}>
                      {filter.count}
                    </span>
                  )}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Notifications List */}
        <div class="space-y-4">
          <For each={filteredNotifications()}>
            {(notification) => (
              <div class={`bg-white rounded-lg shadow-md transition-all hover:shadow-lg ${
                !notification.isRead ? 'border-l-4 border-blue-500' : ''
              }`}>
                <div class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-4 flex-1">
                      {/* Icon */}
                      <div class={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                        <span class="text-xl">{notification.icon}</span>
                      </div>
                      
                      {/* Content */}
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <h3 class={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <span class={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority === 'high' ? 'Tinggi' : notification.priority === 'medium' ? 'Sedang' : 'Rendah'}
                          </span>
                          {!notification.isRead && (
                            <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p class="text-gray-600 mb-2">{notification.message}</p>
                        <div class="flex items-center justify-between">
                          <span class="text-sm text-gray-500">{notification.timestamp}</span>
                          {notification.amount && (
                            <span class={`font-semibold ${
                              notification.amount.startsWith('+') ? 'text-green-600' : 'text-gray-700'
                            }`}>
                              {notification.amount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div class="flex items-center space-x-2 ml-4">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Tandai Dibaca
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        class="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
          
          {filteredNotifications().length === 0 && (
            <div class="bg-white rounded-lg shadow-md p-12 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">📭</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                Tidak Ada Notifikasi
              </h3>
              <p class="text-gray-600">
                {activeFilter() === 'all' 
                  ? 'Belum ada notifikasi yang masuk'
                  : `Tidak ada notifikasi untuk kategori ${filters.find(f => f.key === activeFilter())?.label}`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Settings Section */}
<section class="bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Pengaturan Notifikasi
      </h2>

      <div class="grid md:grid-cols-2 gap-8">
        {/* Notifikasi Push */}
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            Notifikasi Push
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="notif-transaksi" class="text-gray-700">Transaksi</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-transaksi"
                  checked
                  class="sr-only peer"
                  aria-label="Notifikasi Transaksi"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <label for="notif-tabungan" class="text-gray-700">Tabungan</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-tabungan"
                  checked
                  class="sr-only peer"
                  aria-label="Notifikasi Tabungan"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <label for="notif-investasi" class="text-gray-700">Investasi</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-investasi"
                  class="sr-only peer"
                  aria-label="Notifikasi Investasi"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notifikasi Email */}
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            Notifikasi Email
          </h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label for="notif-email-laporan" class="text-gray-700">Laporan Mingguan</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-email-laporan"
                  checked
                  class="sr-only peer"
                  aria-label="Notifikasi Email Laporan Mingguan"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <label for="notif-email-promo" class="text-gray-700">Promo & Penawaran</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-email-promo"
                  class="sr-only peer"
                  aria-label="Notifikasi Email Promo & Penawaran"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between">
              <label for="notif-email-update" class="text-gray-700">Update Produk</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="notif-email-update"
                  checked
                  class="sr-only peer"
                  aria-label="Notifikasi Email Update Produk"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  </div>
  );
};

export default Notifications;