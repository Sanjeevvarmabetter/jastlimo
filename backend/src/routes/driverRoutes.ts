import express from 'express';

import { createDriver, getDrivers, getDriverById, updateDriver, deleteDriver } from '../controllers/driverController';  


const router = express.Router();

router.post('/', createDriver);         
router.get('/', getDrivers);            // Get all drivers
router.get('/:id', getDriverById);      
router.put('/:id', updateDriver);       
router.delete('/:id', deleteDriver);    // Delete driver

export default router;