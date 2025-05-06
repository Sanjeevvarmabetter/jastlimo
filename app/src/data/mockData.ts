import { Driver, DailyLog, Vehicle, Route, Document } from '../types';

// Mock Drivers
export const drivers: Driver[] = [
  {
    id: 'd1',
    fullName: 'Rahul Kumar',
    profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    contactNumber: '+91 9876543210',
    address: '123 Main St, Delhi',
    dateOfBirth: '1985-06-15',
    licenseNumber: 'DL-1234567890',
    licenseExpiry: '2025-12-31',
    joiningDate: '2020-03-15',
    experience: 5,
    status: 'active',
    fleetId: 'fleet-1',
    assignedRoutes: ['r1', 'r2'],
    rating: 4.5,
    documents: [
      {
        id: 'doc1',
        name: 'Driving License',
        type: 'license',
        url: '#',
        uploadDate: '2020-03-15',
        expiryDate: '2025-12-31',
      },
      {
        id: 'doc2',
        name: 'Aadhar Card',
        type: 'id',
        url: '#',
        uploadDate: '2020-03-15',
      }
    ]
  },
  {
    id: 'd2',
    fullName: 'Priya Singh',
    profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    contactNumber: '+91 9876543211',
    address: '456 Park Ave, Mumbai',
    dateOfBirth: '1990-08-22',
    licenseNumber: 'DL-0987654321',
    licenseExpiry: '2024-10-15',
    joiningDate: '2021-02-10',
    experience: 3,
    status: 'active',
    fleetId: 'fleet-1',
    assignedRoutes: ['r3'],
    rating: 4.8,
    documents: [
      {
        id: 'doc3',
        name: 'Driving License',
        type: 'license',
        url: '#',
        uploadDate: '2021-02-10',
        expiryDate: '2024-10-15',
      },
      {
        id: 'doc4',
        name: 'Aadhar Card',
        type: 'id',
        url: '#',
        uploadDate: '2021-02-10',
      }
    ]
  },
  {
    id: 'd3',
    fullName: 'Amit Patel',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    contactNumber: '+91 9876543212',
    address: '789 Lake Rd, Bangalore',
    dateOfBirth: '1988-04-10',
    licenseNumber: 'DL-5678901234',
    licenseExpiry: '2023-11-30',
    joiningDate: '2019-08-05',
    experience: 6,
    status: 'onLeave',
    fleetId: 'fleet-2',
    assignedRoutes: ['r4', 'r5'],
    rating: 3.9,
    documents: [
      {
        id: 'doc5',
        name: 'Driving License',
        type: 'license',
        url: '#',
        uploadDate: '2019-08-05',
        expiryDate: '2023-11-30',
      },
      {
        id: 'doc6',
        name: 'Aadhar Card',
        type: 'id',
        url: '#',
        uploadDate: '2019-08-05',
      }
    ]
  }
];

// Mock Daily Logs
export const dailyLogs: DailyLog[] = [
  {
    id: 'log1',
    driverId: 'd1',
    date: '2023-05-15',
    present: true,
    loginTime: '08:30',
    tripStartTime: '09:00',
    tripCount: 4,
    distanceDriven: 120,
    fuelEfficiency: 15.5,
    incidents: [],
    notes: 'On time for all trips',
    points: 5
  },
  {
    id: 'log2',
    driverId: 'd1',
    date: '2023-05-16',
    present: true,
    loginTime: '08:45',
    tripStartTime: '09:15',
    tripCount: 3,
    distanceDriven: 95,
    fuelEfficiency: 14.8,
    incidents: ['Minor delay on second trip'],
    notes: 'Traffic congestion caused delay',
    points: 4
  },
  {
    id: 'log3',
    driverId: 'd2',
    date: '2023-05-15',
    present: true,
    loginTime: '08:15',
    tripStartTime: '08:45',
    tripCount: 5,
    distanceDriven: 140,
    fuelEfficiency: 16.2,
    incidents: [],
    notes: 'Excellent performance',
    points: 5
  },
  {
    id: 'log4',
    driverId: 'd3',
    date: '2023-05-15',
    present: false,
    tripCount: 0,
    distanceDriven: 0,
    incidents: [],
    notes: 'Sick leave',
    points: 0
  }
];

// Mock Vehicles
export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    registrationNumber: 'DL 01 AB 1234',
    model: 'Tata Starbus',
    type: 'Bus',
    fleetId: 'fleet-1',
    assignedDriverId: 'd1',
    status: 'active'
  },
  {
    id: 'v2',
    registrationNumber: 'MH 02 CD 5678',
    model: 'Ashok Leyland Viking',
    type: 'Bus',
    fleetId: 'fleet-1',
    assignedDriverId: 'd2',
    status: 'active'
  },
  {
    id: 'v3',
    registrationNumber: 'KA 03 EF 9012',
    model: 'Tata Marcopolo',
    type: 'Bus',
    fleetId: 'fleet-2',
    assignedDriverId: 'd3',
    status: 'maintenance'
  }
];

// Mock Routes
export const routes: Route[] = [
  {
    id: 'r1',
    name: 'Delhi - Noida Express',
    startPoint: 'Delhi Bus Terminal',
    endPoint: 'Noida Sector 62',
    distance: 25,
    estimatedDuration: 45
  },
  {
    id: 'r2',
    name: 'Delhi - Gurgaon Route',
    startPoint: 'Delhi Cantt',
    endPoint: 'Gurgaon Cyber City',
    distance: 30,
    estimatedDuration: 60
  },
  {
    id: 'r3',
    name: 'Mumbai - Pune Express',
    startPoint: 'Mumbai Central',
    endPoint: 'Pune Station',
    distance: 150,
    estimatedDuration: 180
  },
  {
    id: 'r4',
    name: 'Bangalore Airport Shuttle',
    startPoint: 'Bangalore City',
    endPoint: 'Bangalore International Airport',
    distance: 40,
    estimatedDuration: 75
  },
  {
    id: 'r5',
    name: 'Bangalore - Mysore Tourist',
    startPoint: 'Bangalore Majestic',
    endPoint: 'Mysore Palace',
    distance: 145,
    estimatedDuration: 180
  }
];