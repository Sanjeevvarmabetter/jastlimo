// controllers/driverController.ts
import { Request, Response } from 'express';
import Driver from '../models/Driver';

// Create a new driver
export const createDriver = async (req: Request, res: Response) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(400).json({ message: 'Error creating driver', error });
  }
};

// Get all drivers
export const getDrivers = async (_req: Request, res: Response) => {
  try {
    const drivers = await Driver.find()
      .populate('routesAssigned')
      .populate('fleetOperatorId');
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching drivers', error });
  }
};

// Get driver by ID
export const getDriverById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('routesAssigned')
      .populate('fleetOperatorId');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching driver', error });
  }
};

// Update driver by ID
export const updateDriver = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ message: 'Error updating driver', error });
  }
};

// Delete driver by ID
export const deleteDriver = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting driver', error });
  }
};
