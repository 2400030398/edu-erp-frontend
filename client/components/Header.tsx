import React from 'react';
import { Menu, Bell, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Dashboard' }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left side - Menu & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="hidden text-foreground hover:text-primary sm:block lg:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>

        {/* Right side - Icons & User */}
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-foreground/60 hover:bg-secondary hover:text-foreground">
            <Bell size={20} />
          </button>
          <button className="rounded-lg p-2 text-foreground/60 hover:bg-secondary hover:text-foreground">
            <Settings size={20} />
          </button>

          {/* User Avatar */}
          <div className="hidden items-center gap-3 border-l border-border pl-4 sm:flex">
            <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
