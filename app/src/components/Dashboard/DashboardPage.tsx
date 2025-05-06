import React from 'react';
import { 
  Users, 
  Truck, 
  MapPin, 
  AlertTriangle, 
  Award, 
  FileText, 
  Clock,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { drivers, vehicles, dailyLogs } from '../../data/mockData';

const StatsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}> = ({ title, value, icon, bgColor }) => {
  return (
    <div className="card">
      <div className="flex items-center">
        <div className={`rounded-full p-2 ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  // Filter data based on user role
  const filteredDrivers = isAdmin 
    ? drivers 
    : drivers.filter(driver => driver.fleetId === user?.fleetId);
  
  const filteredVehicles = isAdmin
    ? vehicles
    : vehicles.filter(vehicle => vehicle.fleetId === user?.fleetId);
  
  const filteredLogs = isAdmin
    ? dailyLogs
    : dailyLogs.filter(log => {
        const driver = drivers.find(d => d.id === log.driverId);
        return driver?.fleetId === user?.fleetId;
      });

  // Calculate stats
  const activeDrivers = filteredDrivers.filter(d => d.status === 'active').length;
  const documentsExpiringSoon = filteredDrivers.flatMap(d => 
    d.documents.filter(doc => doc.expiryDate && 
      new Date(doc.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
  ).length;
  
  const todayDate = new Date().toISOString().split('T')[0];
  const todayPresent = filteredLogs.filter(log => log.date === todayDate && log.present).length;
  
  const topPerformers = filteredDrivers
    .filter(d => d.rating >= 4.5)
    .length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500">Welcome, {user?.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Active Drivers" 
          value={activeDrivers} 
          icon={<Users size={20} className="text-white" />} 
          bgColor="bg-blue-600" 
        />
        <StatsCard 
          title="Vehicles" 
          value={filteredVehicles.length} 
          icon={<Truck size={20} className="text-white" />} 
          bgColor="bg-green-600" 
        />
        <StatsCard 
          title="Today Present" 
          value={todayPresent} 
          icon={<Calendar size={20} className="text-white" />} 
          bgColor="bg-purple-600" 
        />
        <StatsCard 
          title="Docs Expiring Soon" 
          value={documentsExpiringSoon} 
          icon={<FileText size={20} className="text-white" />} 
          bgColor="bg-yellow-500" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Incidents</h3>
          {filteredLogs.some(log => log.incidents.length > 0) ? (
            <div className="space-y-3">
              {filteredLogs
                .filter(log => log.incidents.length > 0)
                .slice(0, 3)
                .map((log, index) => {
                  const driver = drivers.find(d => d.id === log.driverId);
                  return (
                    <div key={index} className="flex items-start p-3 border-b">
                      <div className="flex-shrink-0">
                        <AlertTriangle size={18} className="text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{driver?.fullName} - {new Date(log.date).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{log.incidents.join(', ')}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent incidents reported.</p>
          )}
        </div>
        
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Top Performers</h3>
          {topPerformers > 0 ? (
            <div className="space-y-3">
              {filteredDrivers
                .filter(d => d.rating >= 4.5)
                .slice(0, 3)
                .map((driver, index) => (
                  <div key={index} className="flex items-center p-3 border-b">
                    {driver.profileImage ? (
                      <img 
                        src={driver.profileImage} 
                        alt={driver.fullName} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Users size={20} className="text-gray-500" />
                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium">{driver.fullName}</p>
                      <div className="flex items-center">
                        <Award size={16} className="text-yellow-500" />
                        <span className="ml-1 text-sm">{driver.rating} / 5</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No top performers to display.</p>
          )}
        </div>
      </div>
      
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900">Upcoming License Renewals</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
        </div>
        
        {filteredDrivers.some(d => {
          const licExpiry = new Date(d.licenseExpiry);
          const now = new Date();
          return licExpiry > now && licExpiry < new Date(now.setMonth(now.getMonth() + 3));
        }) ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrivers
                  .filter(d => {
                    const licExpiry = new Date(d.licenseExpiry);
                    const now = new Date();
                    return licExpiry > now && licExpiry < new Date(now.setMonth(now.getMonth() + 3));
                  })
                  .map((driver) => {
                    const expiryDate = new Date(driver.licenseExpiry);
                    const now = new Date();
                    const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                    let statusColor = 'text-green-600 bg-green-50';
                    
                    if (daysRemaining < 30) {
                      statusColor = 'text-red-600 bg-red-50';
                    } else if (daysRemaining < 60) {
                      statusColor = 'text-yellow-600 bg-yellow-50';
                    }
                    
                    return (
                      <tr key={driver.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {driver.profileImage ? (
                              <img 
                                src={driver.profileImage} 
                                alt={driver.fullName} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users size={16} className="text-gray-500" />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{driver.fullName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{driver.licenseNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(driver.licenseExpiry).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusColor}`}>
                            {daysRemaining} days remaining
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No upcoming license renewals in the next 3 months.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;