import { Component, createSignal, For } from 'solid-js';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

interface StatCard {
  icon: string;
  value: string;
  label: string;
  color: string;
}

interface ChartData {
  month: string;
  value: number;
}

interface Activity {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}

interface UserDistribution {
  platform: string;
  percentage: number;
  color: string;
}

const Analytics: Component = () => {
  const [selectedPeriod] = createSignal('6 Bulan Terakhir');
  const [activeMenu, setActiveMenu] = createSignal('Analysics');

  const statCards: StatCard[] = [
    {
      icon: '👥',
      value: '2,847',
      label: 'Total Pengguna',
      color: 'text-blue-600'
    },
    {
      icon: '💰',
      value: 'Rp 1.2M',
      label: 'Total Tabungan',
      color: 'text-green-600'
    },
    {
      icon: '📈',
      value: '+18%',
      label: 'Pertumbuhan Bulanan',
      color: 'text-green-600'
    },
    {
      icon: '⭐',
      value: '4.8',
      label: 'Rating Aplikasi',
      color: 'text-yellow-600'
    }
  ];

  const trendData: ChartData[] = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 1400 },
    { month: 'Mar', value: 1600 },
    { month: 'Apr', value: 1800 },
    { month: 'May', value: 2200 },
    { month: 'Jun', value: 2847 }
  ];

  // Data untuk grafik batang transaksi mingguan
  const weeklyTransactionData: ChartData[] = [
    { month: 'Sen', value: 450 },
    { month: 'Sel', value: 680 },
    { month: 'Rab', value: 520 },
    { month: 'Kam', value: 750 },
    { month: 'Jum', value: 890 },
    { month: 'Sab', value: 340 },
    { month: 'Min', value: 280 }
  ];



  const userDistribution: UserDistribution[] = [
    { platform: 'Android', percentage: 65, color: 'bg-green-500' },
    { platform: 'iOS', percentage: 25, color: 'bg-green-400' },
    { platform: 'Web', percentage: 10, color: 'bg-green-300' }
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      icon: '👤',
      title: '125 pengguna baru mendaftar',
      description: '2 jam yang lalu',
      time: '2 jam lalu',
      iconColor: 'bg-blue-500'
    },
    {
      id: '2',
      icon: '💳',
      title: '340 transaksi tabungan hari ini',
      description: '5 jam yang lalu',
      time: '5 jam lalu',
      iconColor: 'bg-green-500'
    },
    {
      id: '3',
      icon: '⭐',
      title: '23 review baru diterima',
      description: '1 hari yang lalu',
      time: '1 hari lalu',
      iconColor: 'bg-yellow-500'
    },
    {
      id: '4',
      icon: '🎯',
      title: '89 target tabungan tercapai',
      description: '1 hari yang lalu',
      time: '1 hari lalu',
      iconColor: 'bg-red-500'
    }
  ];

  const maxTrendValue = Math.max(...trendData.map(d => d.value));
  const maxWeeklyValue = Math.max(...weeklyTransactionData.map(d => d.value));

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
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Analytics</h1>
            <p class="text-gray-600">Selamat datang kembali! Berikut ringkasan aktivitas hari ini</p>
          </div>

          {/* Stats Cards */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <For each={statCards}>
              {(card) => (
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div class="text-4xl mb-3">{card.icon}</div>
                  <div class="text-2xl font-bold text-gray-800 mb-1">{card.value}</div>
                  <div class="text-sm text-gray-600">{card.label}</div>
                </div>
              )}
            </For>
          </div>

          {/* Charts Section */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Trend Chart */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">
                Tren Pengguna Aktif ({selectedPeriod()})
              </h2>
              
              <div class="h-64 relative">
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>3.000</span>
                  <span>2.500</span>
                  <span>2.000</span>
                  <span>1.500</span>
                  <span>1.000</span>
                  <span>500</span>
                  <span>0</span>
                </div>
                
                <div class="ml-12 h-full relative">
                  <svg class="w-full h-full" viewBox="0 0 400 200">
                    <defs>
                      <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    <For each={[0, 1, 2, 3, 4, 5, 6]}>
                      {(i) => (
                        <line 
                          x1="0" 
                          y1={i * 200/6} 
                          x2="400" 
                          y2={i * 200/6} 
                          stroke="#f3f4f6" 
                          stroke-width="1"
                        />
                      )}
                    </For>
                    
                    {/* Trend line */}
                    <path
                      d={`M ${trendData.map((d, i) => `${i * 400/(trendData.length-1)},${200 - (d.value/maxTrendValue) * 200}`).join(' L ')}`}
                      fill="url(#trendGradient)"
                      stroke="#10b981"
                      stroke-width="2"
                    />
                    
                    {/* Data points */}
                    <For each={trendData}>
                      {(data, i) => (
                        <circle
                          cx={i() * 400/(trendData.length-1)}
                          cy={200 - (data.value/maxTrendValue) * 200}
                          r="4"
                          fill="#10b981"
                        />
                      )}
                    </For>
                  </svg>
                  
                  <div class="flex justify-between text-xs text-gray-500 mt-2">
                    <For each={trendData}>
                      {(data) => <span>{data.month}</span>}
                    </For>
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Chart - Transaksi Mingguan */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">
                Transaksi Mingguan
              </h2>
              
              <div class="h-64 relative">
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                  <span>900</span>
                  <span>750</span>
                  <span>600</span>
                  <span>450</span>
                  <span>300</span>
                  <span>150</span>
                  <span>0</span>
                </div>
                
                <div class="ml-12 h-full relative">
                  <svg class="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    <For each={[0, 1, 2, 3, 4, 5, 6]}>
                      {(i) => (
                        <line 
                          x1="0" 
                          y1={i * 200/6} 
                          x2="400" 
                          y2={i * 200/6} 
                          stroke="#f3f4f6" 
                          stroke-width="1"
                        />
                      )}
                    </For>
                    
                    {/* Bar chart */}
                    <For each={weeklyTransactionData}>
                      {(data, i) => {
                        const barWidth = 45;
                        const spacing = 400 / weeklyTransactionData.length;
                        const x = i() * spacing + (spacing - barWidth) / 2;
                        const height = (data.value / maxWeeklyValue) * 190;
                        const y = 200 - height;
                        
                        return (
                          <g>
                            <rect
                              x={x}
                              y={y}
                              width={barWidth}
                              height={height}
                              fill="#3b82f6"
                              rx="4"
                              class="transition-all duration-300 hover:fill-blue-600"
                            />
                            <text
                              x={x + barWidth/2}
                              y={y - 5}
                              text-anchor="middle"
                              class="text-xs fill-gray-600"
                            >
                              {data.value}
                            </text>
                          </g>
                        );
                      }}
                    </For>
                  </svg>
                  
                  <div class="flex justify-between text-xs text-gray-500 mt-2">
                    <For each={weeklyTransactionData}>
                      {(data) => <span class="flex-1 text-center">{data.month}</span>}
                    </For>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Distribution Section */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Distribution */}
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 class="text-lg font-semibold text-gray-800 mb-6">Distribusi Pengguna</h2>
              
              <div class="flex items-center justify-center mb-6">
                <div class="relative w-32 h-32">
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="#10b981" />
                    <circle cx="50" cy="50" r="40" fill="#34d399" 
                            stroke-dasharray="63 100" 
                            stroke-dashoffset="25" 
                            stroke-width="0" 
                            transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="25" fill="white" />
                  </svg>
                </div>
              </div>
              
              <div class="space-y-3">
                <For each={userDistribution}>
                  {(item) => (
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <div class={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span class="text-sm text-gray-700">{item.platform}</span>
                      </div>
                      <span class="text-sm font-medium text-gray-800">{item.percentage}%</span>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-6">Aktivitas Terkini</h2>
            
            <div class="space-y-4">
              <For each={recentActivities}>
                {(activity) => (
                  <div class="flex items-start space-x-3">
                    <div class={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${activity.iconColor}`}>
                      {activity.icon}
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-medium text-gray-800">{activity.title}</h3>
                      <p class="text-xs text-gray-500 mt-1">{activity.description}</p>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;