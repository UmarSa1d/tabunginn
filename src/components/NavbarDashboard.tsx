import { Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const NavbarDashboard: Component = () => {
  const navigate = useNavigate();

  const goToNotifikasi = () => {
    navigate('/notifikasi');
  };

  const goToDashboardPengguna = () => {
    navigate('/Dashboardpengguna'); // Ubah rute tujuan di sini
  };

  const handleLogout = () => {
    console.log('Logout ditekan');
    navigate('/login');
  };

  return (
    <header class="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <h1 class="text-xl font-bold text-green-800">Dashboard TABUNGIN</h1>
      <div class="flex items-center space-x-4">
        <button
          onClick={goToNotifikasi}
          class="text-sm text-green-700 hover:text-green-900"
        >
          Notifikasi
        </button>
        <button
          onClick={goToDashboardPengguna}
          class="text-sm text-green-700 hover:text-green-900"
        >
          Profil
        </button>
        <button
          onClick={handleLogout}
          class="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavbarDashboard;
