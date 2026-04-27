import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  CheckSquare,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavItems = (): NavItem[] => {
    switch (user?.role) {
      case 'admin':
        return [
          { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
          { label: 'Manage Users', href: '/admin/users', icon: <Users size={20} /> },
          { label: 'Reports', href: '/admin/reports', icon: <BarChart3 size={20} /> },
        ];
      case 'teacher':
        return [
          { label: 'Dashboard', href: '/teacher', icon: <LayoutDashboard size={20} /> },
          { label: 'My Classes', href: '/teacher/classes', icon: <BookOpen size={20} /> },
          { label: 'Add Marks', href: '/teacher/marks', icon: <CheckSquare size={20} /> },
          { label: 'Attendance', href: '/teacher/attendance', icon: <Users size={20} /> },
        ];
      case 'student':
        return [
          { label: 'Dashboard', href: '/student', icon: <LayoutDashboard size={20} /> },
          { label: 'My Marks', href: '/student/marks', icon: <CheckSquare size={20} /> },
          { label: 'Attendance', href: '/student/attendance', icon: <Users size={20} /> },
          { label: 'Profile', href: '/student/profile', icon: <User size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 bg-primary text-primary-foreground transition-transform duration-300 lg:relative lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-primary-foreground/10 p-6">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">ERP</div>
              <button
                onClick={onClose}
                className="hidden text-primary-foreground/60 hover:text-primary-foreground sm:block lg:hidden"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'text-primary-foreground/70 hover:bg-primary-foreground/10'
                )}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Info & Logout */}
          <div className="border-t border-primary-foreground/10 p-4">
            <div className="mb-4 rounded-lg bg-primary-foreground/10 p-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-primary-foreground/70 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
