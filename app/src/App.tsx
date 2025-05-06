import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import LoginPage from './components/Login/LoginPage';
import DashboardPage from './components/Dashboard/DashboardPage';
import DriversPage from './components/Drivers/DriversPage';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  // if (!isAuthenticated) {
  //   return <LoginPage />;
  // }

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'drivers' && <DriversPage />}
      {activePage !== 'dashboard' && activePage !== 'drivers' && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Under Construction</h3>
            <p className="mt-1 text-sm text-gray-500">
              This section is currently being developed
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;