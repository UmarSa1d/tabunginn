import { Component, createSignal, For } from 'solid-js';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

interface DashboardCard {
  icon: string;
  title: string;
  value: string;
  description: string;
  percentage: string;
  percentageColor: string;
  progressValue: number;
}

interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}

const Dashboard: Component = () => {
  const [selectedPeriod, setSelectedPeriod] = createSignal('2 Hari Terakhir');
  const [activeMenu, setActiveMenu] = createSignal('dashboard');

  const dashboardCards: DashboardCard[] = [
    {
      icon: '👥',
      title: 'Total Pengguna Aktif',
      value: '2,847',
      description: 'Total Pengguna Aktif',
      percentage: '+12%',
      percentageColor: 'text-green-600',
      progressValue: 75
    },
    {
      icon: '💰',
      title: 'Total Dana tersimpan',
      value: 'Rp 1.2M',
      description: 'Total Dana tersimpan',
      percentage: '+8%',
      percentageColor: 'text-green-600',
      progressValue: 60
    },
    {
      icon: '📈',
      title: 'Transaksi Hari Ini',
      value: '1,247',
      description: 'Transaksi Hari Ini',
      percentage: '+18%',
      percentageColor: 'text-green-600',
      progressValue: 85
    },
    {
      icon: '⭐',
      title: 'Rating Aplikasi',
      value: '4.8',
      description: 'Rating Aplikasi',
      percentage: '-2%',
      percentageColor: 'text-red-500',
      progressValue: 95
    }
  ];

  const activities: ActivityItem[] = [
    {
      id: '1',
      icon: '👤',
      title: 'Pendaftaran Pengguna Baru',
      description: '25 pengguna baru mendaftar',
      time: '2 jam lalu',
      iconColor: 'bg-blue-500'
    },
    {
      id: '2',
      icon: '💳',
      title: 'Transaksi Tabungan',
      description: '340 transaksi berhasil',
      time: '5 jam lalu',
      iconColor: 'bg-cyan-500'
    },
    {
      id: '3',
      icon: '⭐',
      title: 'Review Baru',
      description: '23 review positif diterima',
      time: '1 hari lalu',
      iconColor: 'bg-yellow-500'
    },
    {
      id: '4',
      icon: '🎯',
      title: 'Target Tercapai',
      description: '85 pengguna capai target',
      time: '1 hari lalu',
      iconColor: 'bg-red-500'
    },
    {
      id: '5',
      icon: '⚠️',
      title: 'Laporan Error',
      description: '3 laporan bug dari pengguna',
      time: '2 hari lalu',
      iconColor: 'bg-orange-500'
    }
  ];

  return (
    <div class="min-h-screen bg-gray-50 flex">
      <Sidebar activeMenu={activeMenu()} setActiveMenu={setActiveMenu} />

      <div class="flex-1 flex flex-col">
        <NavbarDashboard />

        <main class="flex-1 p-6">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <p class="text-gray-600">Selamat datang kembali! Berikut ringkasan aktivitas hari ini</p>
          </div>

          {/* Stats Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <For each={dashboardCards}>
              {(card) => (
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div class="flex items-center justify-between mb-4">
                    <div class="text-2xl">{card.icon}</div>
                    <span class={`text-sm font-medium px-2 py-1 rounded ${card.percentageColor} bg-opacity-10`}>
                      {card.percentage}
                    </span>
                  </div>

                  <div class="mb-4">
                    <h3 class="text-2xl font-bold text-gray-800 mb-1">{card.value}</h3>
                    <p class="text-sm text-gray-600">{card.description}</p>
                  </div>

                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${card.progressValue}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </For>
          </div>

          {/* Charts and Activity Section */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Section */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-lg font-semibold text-gray-800">Tren Tabungan Harian</h2>
                <select
                  title="Filter Rating"
                  aria-label="Filter Rating"
                  class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={selectedPeriod()}
                  onChange={(e) => setSelectedPeriod(e.currentTarget.value)}
                >
                  <option value="2 Hari Terakhir">2 Hari Terakhir</option>
                  <option value="7 Hari Terakhir">7 Hari Terakhir</option>
                  <option value="30 Hari Terakhir">30 Hari Terakhir</option>
                </select>
              </div>

              {/* Placeholder for chart */}
              <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="text-4xl mb-2">📊</div>
                  <p class="text-gray-500">Chart akan ditampilkan di sini</p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">Tren Tabungan Harian</h2>

              <div class="space-y-4">
                <For each={activities}>
                  {(activity) => (
                    <div class="flex items-start space-x-3">
                      <div class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${activity.iconColor}`}>
                        {activity.icon}
                      </div>
                      <div class="flex-1 min-w-0">
                        <h3 class="text-sm font-medium text-gray-800">{activity.title}</h3>
                        <p class="text-xs text-gray-500 mt-1">{activity.description}</p>
                      </div>
                      <span class="text-xs text-gray-400">{activity.time}</span>
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

export default Dashboard;
