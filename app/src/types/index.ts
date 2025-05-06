export type UserRole = 'admin' | 'operator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  fleetId?: string;
}

export interface Driver {
  id: string;
  fullName: string;
  profileImage?: string;
  contactNumber: string;
  address: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseExpiry: string;
  joiningDate: string;
  experience: number;
  status: 'active' | 'onLeave' | 'resigned';
  fleetId: string;
  assignedRoutes: string[];
  rating: number;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
  expiryDate?: string;
}

export interface DailyLog {
  id: string;
  driverId: string;
  date: string;
  present: boolean;
  loginTime?: string;
  tripStartTime?: string;
  tripCount: number;
  distanceDriven: number;
  fuelEfficiency?: number;
  incidents: string[];
  notes: string;
  points: number;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  type: string;
  fleetId: string;
  assignedDriverId?: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: number;
  estimatedDuration: number;
}