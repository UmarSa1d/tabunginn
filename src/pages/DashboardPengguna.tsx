import { Component, createSignal, For, onMount } from 'solid-js';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

interface SavingsTarget {
  id: string;
  icon: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
  daysRemaining: number;
  iconColor: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  amount: string;
  icon: string;
  iconColor: string;
}

const Users: Component = () => {
  const [currentBalance] = createSignal(8750000);
  const [activeMenu, setActiveMenu] = createSignal('Pengguna');
  const [userName, setUserName] = createSignal('Pengguna');
  const [showModal, setShowModal] = createSignal(false);
  const [targetName, setTargetName] = createSignal('');
  const [targetAmount, setTargetAmount] = createSignal<number | null>(null);

  onMount(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUserName(parsed.namaLengkap || 'Pengguna');
      } catch (err) {
        console.error('Gagal membaca userProfile dari localStorage', err);
      }
    }
  });

  const [savingsTargets, setSavingsTargets] = createSignal<SavingsTarget[]>([
    {
      id: '1',
      icon: '🏠',
      name: 'DP rumah',
      currentAmount: 8000000,
      targetAmount: 50000000,
      percentage: 16,
      daysRemaining: 365,
      iconColor: 'bg-green-500'
    },
    {
      id: '2',
      icon: '🚗',
      name: 'Mobil Keluarga',
      currentAmount: 5000000,
      targetAmount: 31000000,
      percentage: 16,
      daysRemaining: 365,
      iconColor: 'bg-red-500'
    },
    {
      id: '3',
      icon: '✈️',
      name: 'Liburan Raja Ampat',
      currentAmount: 200000,
      targetAmount: 15000000,
      percentage: 1,
      daysRemaining: 365,
      iconColor: 'bg-blue-500'
    }
  ]);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Streak 10 Hari!',
      description: 'Konsisten menabung 10 hari berturut-turut',
      icon: '🏆',
      iconColor: 'bg-yellow-500'
    },
    {
      id: '2',
      title: 'Target Master',
      description: 'Berhasil mencapai 3 target tabungan',
      icon: '🎯',
      iconColor: 'bg-red-500'
    },
    {
      id: '3',
      title: 'RP 10M+',
      description: 'Total tabungan yang terkumpul mencapai 10M+',
      icon: '💰',
      iconColor: 'bg-green-500'
    }
  ];

  const activities: Activity[] = [
    {
      id: '1',
      title: 'Menabung untuk DP Rumah',
      description: 'Hari ini, 17:30',
      amount: '+Rp 100.000',
      icon: '🏠',
      iconColor: 'bg-green-500'
    },
    {
      id: '2',
      title: 'Target "Dana Darurat" tercapai!',
      description: 'Kemarin, 14:22',
      amount: 'Rp 5.000.000',
      icon: '🎯',
      iconColor: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Nabung otomatis harian',
      description: '2 hari lalu, 09:00',
      amount: '+Rp 50.000',
      icon: '💰',
      iconColor: 'bg-blue-500'
    },
    {
      id: '4',
      title: 'Achievement: 1 Bulan Konsisten',
      description: '3 hari lalu, 10:45',
      amount: 'Badge Earned',
      icon: '🏆',
      iconColor: 'bg-yellow-500'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID');
  };

  const handleAddTarget = () => {
    if (!targetName() || !targetAmount()) return;
    const newTarget: SavingsTarget = {
      id: Date.now().toString(),
      icon: '📌',
      name: targetName(),
      currentAmount: 0,
      targetAmount: targetAmount()!,
      percentage: 0,
      daysRemaining: 365,
      iconColor: 'bg-purple-500'
    };
    setSavingsTargets([...savingsTargets(), newTarget]);
    setTargetName('');
    setTargetAmount(null);
    setShowModal(false);
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div class="w-64 fixed top-0 left-0 h-screen z-10 bg-white border-r border-gray-200">
        <Sidebar activeMenu={activeMenu()} setActiveMenu={setActiveMenu} />
      </div>

      {/* Main Content */}
      <div class="ml-64 flex flex-col min-h-screen">
        <NavbarDashboard />
        <main class="flex-1 p-6">
          {/* Header */}
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {userName().split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h1 class="text-xl font-bold text-gray-800">Halo, {userName()}!</h1>
                  <p class="text-gray-600">Selamat datang kembali di Tabungan</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
              >
                + Tambah Target
              </button>
            </div>
          </div>

          {/* Modal Tambah Target */}
          {showModal() && (
            <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
              <div class="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Tambah Target Tabungan</h2>
                <input
                  type="text"
                  placeholder="Nama Target"
                  value={targetName()}
                  onInput={(e) => setTargetName(e.currentTarget.value)}
                  class="w-full mb-3 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Nominal Target"
                  value={targetAmount() ?? ''}
                  onInput={(e) => setTargetAmount(parseInt(e.currentTarget.value))}
                  class="w-full mb-3 p-2 border rounded"
                />
                <div class="flex justify-end space-x-2 mt-4">
                  <button
                    class="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    class="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={handleAddTarget}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 space-y-6">
              {/* Balance */}
              <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                <h2 class="text-lg font-medium mb-2">Saldo Tabungan Anda</h2>
                <div class="text-3xl font-bold mb-4">Rp {formatNumber(currentBalance())}</div>

                <div class="grid grid-cols-3 gap-4 mt-6">
                  <div class="text-center">
                    <div class="bg-white bg-opacity-20 rounded-lg p-3 mb-2">
                      <div class="text-2xl">💰</div>
                    </div>
                    <div class="text-sm">Nabung Sekarang</div>
                  </div>
                  <div class="text-center">
                    <div class="bg-white bg-opacity-20 rounded-lg p-3 mb-2">
                      <div class="text-2xl">📊</div>
                    </div>
                    <div class="text-sm">Lihat Laporan</div>
                  </div>
                  <div class="text-center">
                    <div class="bg-white bg-opacity-20 rounded-lg p-3 mb-2">
                      <div class="text-2xl">🎯</div>
                    </div>
                    <div class="text-sm">Atur Target</div>
                  </div>
                </div>
              </div>

              {/* Target Tabungan */}
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-6">Target Tabungan Aktif</h2>
                <div class="space-y-4">
                  <For each={savingsTargets()}>
                    {(target) => (
                      <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center space-x-3 mb-3">
                          <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white ${target.iconColor}`}>
                            {target.icon}
                          </div>
                          <div class="flex-1">
                            <h3 class="font-medium text-gray-800">{target.name}</h3>
                            <p class="text-sm text-gray-600">
                              {formatCurrency(target.currentAmount)} / {formatCurrency(target.targetAmount)}
                            </p>
                          </div>
                        </div>
                        <div class="mb-2">
                          <div class="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{target.percentage}% tercapai</span>
                            <span>{target.daysRemaining} bulan lagi</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-2">
                            <div
                              class="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${target.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>

              {/* Statistik */}
              <div class="grid grid-cols-3 gap-4">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div class="text-2xl font-bold text-gray-800 mb-1">45</div>
                  <div class="text-sm text-gray-600">Hari Streak</div>
                </div>
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div class="text-2xl font-bold text-gray-800 mb-1">Rp 58K</div>
                  <div class="text-sm text-gray-600">Rata-rata harian</div>
                </div>
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <div class="text-2xl font-bold text-gray-800 mb-1">83%</div>
                  <div class="text-sm text-gray-600">Progress harian</div>
                </div>
              </div>

              {/* Aktivitas */}
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-6">Aktivitas Terbaru</h2>
                <div class="space-y-4">
                  <For each={activities}>
                    {(activity) => (
                      <div class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div class={`w-10 h-10 rounded-full flex items-center justify-center text-white ${activity.iconColor}`}>
                          {activity.icon}
                        </div>
                        <div class="flex-1">
                          <h3 class="font-medium text-gray-800">{activity.title}</h3>
                          <p class="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div class="text-right">
                          <div class="text-sm font-medium text-gray-800">{activity.amount}</div>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>

            {/* Sidebar Achievements */}
            <div class="space-y-6">
              <For each={achievements}>
                {(achievement) => (
                  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div class="text-4xl mb-3">{achievement.icon}</div>
                    <h3 class="font-semibold text-gray-800 mb-2">{achievement.title}</h3>
                    <p class="text-sm text-gray-600">{achievement.description}</p>
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

export default Users;
