import { Component, For } from 'solid-js';
import { A } from '@solidjs/router';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const menuItems = [
  { name: 'Dashboard', icon: '🏠', path: '/Dashboard' },
  { name: 'Testimoni', icon: '💬', path: '/DashboardTestimoni' },
  { name: 'Pengguna', icon: '👤', path: '/DashboardPengguna' },
  { name: 'Analytics', icon: '📈', path: '/DashboardAnalysics' },
  { name: 'Pengaturan', icon: '⚙️', path: '/DashboardPengaturan' }
];

const Sidebar: Component<SidebarProps> = (props) => {
  return (
    <div class="w-64 bg-green-800 text-white h-screen flex flex-col">
      <div class="p-6 border-b border-green-700">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <div class="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span class="text-xl font-bold">TABUNGIN</span>
        </div>
      </div>
      <nav class="p-4 flex-1">
        <For each={menuItems}>
          {(item) => (
            <A
              href={item.path}
              onClick={() => props.setActiveMenu(item.name)}
              class={`block w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                props.activeMenu === item.name
                  ? 'bg-green-700 text-white'
                  : 'text-green-200 hover:bg-green-700 hover:text-white'
              }`}
            >
              <span class="text-lg">{item.icon}</span>
              <span class="font-medium">{item.name}</span>
            </A>
          )}
        </For>
      </nav>
    </div>
  );
};

export default Sidebar;
