import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Star, 
  ChevronDown, 
  User,
  MapPin,
  Calendar,
  Phone,
  FileText,
  Edit,
  MoreVertical
} from 'lucide-react';
import { drivers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const DriversPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Filter drivers based on user role
  const filteredDrivers = isAdmin 
    ? drivers 
    : drivers.filter(driver => driver.fleetId === user?.fleetId);
  
  // Apply search and filters
  const displayedDrivers = filteredDrivers.filter(driver => {
    const matchesSearch = driver.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Drivers</h2>
        <p className="text-gray-500">Manage and monitor your drivers</p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or license number"
            className="pl-10 input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <button className="btn btn-secondary flex items-center">
              <Filter size={18} className="mr-2" />
              <span>Status: {statusFilter === 'all' ? 'All' : statusFilter}</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
              <div className="py-1">
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('onLeave')}
                >
                  On Leave
                </button>
                <button 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => setStatusFilter('resigned')}
                >
                  Resigned
                </button>
              </div>
            </div>
          </div>
          
          <button className="btn btn-primary flex items-center">
            <Plus size={18} className="mr-2" />
            <span>Add Driver</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedDrivers.length > 0 ? (
          displayedDrivers.map((driver) => (
            <div key={driver.id} className="card">
              <div className="flex justify-between">
                <div className="flex items-start">
                  {driver.profileImage ? (
                    <img 
                      src={driver.profileImage}
                      alt={driver.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={24} className="text-gray-500" />
                    </div>
                  )}
                  
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{driver.fullName}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500" />
                        <span className="ml-1">{driver.rating}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span className={`capitalize ${
                        driver.status === 'active' ? 'text-green-600' : 
                        driver.status === 'onLeave' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {driver.status === 'onLeave' ? 'On Leave' : driver.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <button className="p-1 rounded-full hover:bg-gray-100">
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  <span>{driver.contactNumber}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{driver.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FileText size={16} className="mr-2 text-gray-400" />
                  <span>License: {driver.licenseNumber}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>Joined: {new Date(driver.joiningDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <button className="btn btn-secondary flex items-center text-sm py-1">
                    <Edit size={16} className="mr-1" />
                    View Profile
                  </button>
                  <button className="btn btn-primary flex items-center text-sm py-1">
                    Log Data
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No drivers found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversPage;