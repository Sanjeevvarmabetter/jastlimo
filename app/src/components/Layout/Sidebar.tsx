import React from 'react';
import { 
  Home, 
  Users, 
  Truck, 
  MapPin, 
  BarChart2, 
  Settings, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active, onClick }) => {
  return (
    <button
      className={`sidebar-link ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );
};

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 bg-white shadow-sm h-full">
      <div className="p-4">
        <div className="space-y-1">
          <NavItem 
            icon={<Home size={20} />} 
            text="Dashboard" 
            active={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')}
          />
          <NavItem 
            icon={<Users size={20} />} 
            text="Drivers" 
            active={activePage === 'drivers'} 
            onClick={() => setActivePage('drivers')}
          />
          <NavItem 
            icon={<Truck size={20} />} 
            text="Vehicles" 
            active={activePage === 'vehicles'} 
            onClick={() => setActivePage('vehicles')}
          />
          <NavItem 
            icon={<MapPin size={20} />} 
            text="Routes" 
            active={activePage === 'routes'} 
            onClick={() => setActivePage('routes')}
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            text="Daily Logs" 
            active={activePage === 'logs'} 
            onClick={() => setActivePage('logs')}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            text="Documents" 
            active={activePage === 'documents'} 
            onClick={() => setActivePage('documents')}
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            text="Reports" 
            active={activePage === 'reports'} 
            onClick={() => setActivePage('reports')}
          />
          {isAdmin && (
            <NavItem 
              icon={<Settings size={20} />} 
              text="Settings" 
              active={activePage === 'settings'} 
              onClick={() => setActivePage('settings')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;