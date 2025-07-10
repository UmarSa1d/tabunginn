import { createStore } from "solid-js/store";

interface User {
  name: string;
  email: string;
  avatar: string | null;
  password: string;
}

// Inisialisasi data user default
const initialUser: User = {
  name: "",
  email: "",
  avatar: null,
  password: "",
};

// Ambil data user dari localStorage jika tersedia
const storedUser = JSON.parse(localStorage.getItem("user") || "null");
const [userStore, setUserStore] = createStore<{ user: User }>({
  user: storedUser || initialUser,
});

// Fungsi untuk update data user
const updateUser = (updates: Partial<User>) => {
  setUserStore("user", (prev) => {
    const updatedUser = { ...prev, ...updates };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  });
};

// Fungsi untuk mereset avatar ke default (berbasis inisial)
const resetAvatar = () => {
  setUserStore("user", (prev) => {
    const initial = prev.name.charAt(0).toUpperCase();

    const svg = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#f43f5e"/>
        <text x="50" y="65" font-family="Arial" font-size="40" fill="white" text-anchor="middle">${initial}</text>
      </svg>
    `;

    const base64 = `data:image/svg+xml;base64,${btoa(svg)}`;

    const updatedUser = { ...prev, avatar: base64 };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  });
};

// Simpan data awal jika belum ada di localStorage
if (!storedUser) {
  localStorage.setItem("user", JSON.stringify(initialUser));
}

export { userStore, setUserStore, updateUser, resetAvatar };
