import { Component, createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Sidebar from '../components/Sidebar';
import NavbarDashboard from '../components/NavbarDashboard';

type UserProfile = {
  namaLengkap: string;
  email: string;
  nomorTelepon: string;
  alamat: string;
  posisiJabatan: string;
  profileImage: string | null;
};

const saveUserProfileToStorage = (data: UserProfile) => {
  localStorage.setItem('userProfile', JSON.stringify(data));
};

const loadUserProfileFromStorage = (): UserProfile | null => {
  const data = localStorage.getItem('userProfile');
  return data ? JSON.parse(data) : null;
};

const PengaturanProfile: Component = () => {
  const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [nomorTelepon, setNomorTelepon] = createSignal('');
  const [alamat, setAlamat] = createSignal('');
  const [posisiJabatan, setPosisiJabatan] = createSignal('');
  const [profileImage, setProfileImage] = createSignal<string | null>(null);

  const [isSaving, setIsSaving] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [saveMessage, setSaveMessage] = createSignal('');
  const [originalData, setOriginalData] = createSignal<UserProfile | null>(null);
  const [activeMenu, setActiveMenu] = createSignal('Testimoni');

  createEffect(() => {
    setIsLoading(true);
    const data = loadUserProfileFromStorage();
    if (data) {
      setNamaLengkap(data.namaLengkap);
      setEmail(data.email);
      setNomorTelepon(data.nomorTelepon);
      setAlamat(data.alamat);
      setPosisiJabatan(data.posisiJabatan);
      setProfileImage(data.profileImage);
      setOriginalData(data);
    }
    setIsLoading(false);
  });

  const hasChanges = () => {
    const original = originalData();
    if (!original) return true;
    return (
      namaLengkap() !== original.namaLengkap ||
      email() !== original.email ||
      nomorTelepon() !== original.nomorTelepon ||
      alamat() !== original.alamat ||
      posisiJabatan() !== original.posisiJabatan ||
      profileImage() !== original.profileImage
    );
  };

  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getCurrentProfileData = (): UserProfile => ({
    namaLengkap: namaLengkap(),
    email: email(),
    nomorTelepon: nomorTelepon(),
    alamat: alamat(),
    posisiJabatan: posisiJabatan(),
    profileImage: profileImage(),
  });

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (!namaLengkap().trim()) errors.push('Nama lengkap harus diisi');
    if (!email().trim()) {
      errors.push('Email harus diisi');
    } else if (!/\S+@\S+\.\S+/.test(email())) {
      errors.push('Format email tidak valid');
    }
    if (!nomorTelepon().trim()) errors.push('Nomor telepon harus diisi');
    if (!alamat().trim()) errors.push('Alamat harus diisi');
    if (!posisiJabatan().trim()) errors.push('Posisi/jabatan harus diisi');
    return { isValid: errors.length === 0, errors };
  };

  const handleSimpanPerubahan = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      setSaveMessage(`Error: ${validation.errors.join(', ')}`);
      setTimeout(() => setSaveMessage(''), 5000);
      return;
    }
    setIsSaving(true);
    setSaveMessage('');
    try {
      const profileData = getCurrentProfileData();
      await new Promise((r) => setTimeout(r, 1000)); // Simulasi delay
      saveUserProfileToStorage(profileData);
      setOriginalData(profileData);
      setSaveMessage('Perubahan berhasil disimpan!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setSaveMessage('Error: Gagal menyimpan perubahan');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBatal = () => {
    const original = originalData();
    if (original) {
      setNamaLengkap(original.namaLengkap);
      setEmail(original.email);
      setNomorTelepon(original.nomorTelepon);
      setAlamat(original.alamat);
      setPosisiJabatan(original.posisiJabatan);
      setProfileImage(original.profileImage);
      setSaveMessage('Perubahan dibatalkan');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleLogOut = () => {
    console.log('Logging out...');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <div class="w-64 fixed top-0 left-0 h-screen z-10 bg-white border-r border-gray-200">
        <Sidebar activeMenu={activeMenu()} setActiveMenu={setActiveMenu} />
      </div>
      <div class="ml-64 flex flex-col min-h-screen">
        <NavbarDashboard />
        <main class="flex-1 p-6">
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Pengaturan</h1>
            <p class="text-gray-600">Kelola preferensi dan konfigurasi sistem aplikasi Tabungin</p>
          </div>
          <div class="flex gap-6">
            <div class="flex-1">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-6">Profil Administrator</h2>
                <div class="flex items-center mb-6">
                  <div class="relative">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {profileImage() ? (
                        <img src={profileImage()!} alt="Profile" class="w-full h-full rounded-full object-cover" />
                      ) : (
                        'U'
                      )}
                    </div>
                  </div>
                  <div class="ml-4">
                    <label class="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
                      Ubah Foto Profil
                      <input type="file" accept="image/*" class="hidden" onChange={handleImageUpload} />
                    </label>
                    <p class="text-sm text-gray-500 mt-1">Format: JPG, PNG. Maksimal 2MB</p>
                  </div>
                </div>
                <div class="space-y-4">
                  {[{ label: 'Nama Lengkap', value: namaLengkap, setter: setNamaLengkap, type: 'text' },
                    { label: 'Email', value: email, setter: setEmail, type: 'email' },
                    { label: 'Nomor Telepon', value: nomorTelepon, setter: setNomorTelepon, type: 'tel' }].map(field => (
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} <span class="text-red-500">*</span>
                      </label>
                      <input
                        type={field.type}
                        value={field.value()}
                        onInput={(e) => field.setter(e.currentTarget.value)}
                        placeholder={`Masukan ${field.label.toLowerCase()}`}
                        disabled={isLoading()}
                        class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                          isLoading() ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  ))}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Alamat <span class="text-red-500">*</span></label>
                    <textarea
                      value={alamat()}
                      onInput={(e) => setAlamat(e.currentTarget.value)}
                      placeholder="Masukan alamat"
                      rows={3}
                      disabled={isLoading()}
                      class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        isLoading() ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Posisi / Jabatan <span class="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={posisiJabatan()}
                      onInput={(e) => setPosisiJabatan(e.currentTarget.value)}
                      placeholder="Masukan posisi/jabatan"
                      disabled={isLoading()}
                      class={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        isLoading() ? 'bg-gray-100 cursor-not-allowed' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                {saveMessage() && (
                  <div class={`mt-4 p-3 rounded-md ${
                    saveMessage().includes('Error')
                      ? 'bg-red-100 text-red-700 border border-red-300'
                      : saveMessage().includes('berhasil')
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-blue-100 text-blue-700 border border-blue-300'
                  }`}>
                    {saveMessage()}
                  </div>
                )}

                <div class="flex gap-3 mt-6">
                  <button
                    onClick={handleSimpanPerubahan}
                    disabled={!hasChanges() || isSaving() || isLoading()}
                    class={`px-6 py-2 rounded-md font-medium transition-colors ${
                      !hasChanges() || isSaving() || isLoading()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSaving() ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                  <button
                    onClick={handleBatal}
                    disabled={!hasChanges() || isLoading()}
                    class={`px-6 py-2 rounded-md font-medium transition-colors ${
                      !hasChanges() || isLoading()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleLogOut}
                    disabled={isLoading()}
                    class={`px-6 py-2 rounded-md font-medium transition-colors ${
                      isLoading()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
            <div class="w-80 flex items-end justify-center">
              {/* Tambahan dekorasi atau ilustrasi */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PengaturanProfile;
