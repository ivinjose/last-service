import { addVehiclesInit, addVehicles, addVehiclesSuccess, addVehiclesFailure } from './addVehiclesActions';
import { getVehicles, getVehiclesAsync, getVehiclesSuccess, getVehiclesFailure } from './getVehicleActions';

import { addServicesInit, addServices, addServicesSuccess, addServicesFailure } from './addServicesActions';

import { getAllVehicles, getAllVehiclesAsync, getAllVehiclesSuccess, getAllVehiclesFailure } from './getVehicleActions';
import { getAllServices, getAllServicesAsync, getAllServicesSuccess, getAllServicesFailure } from './getServicesActions';

// Vehicles
export { addVehiclesInit };
export { addVehicles };
export { addVehiclesSuccess };
export { addVehiclesFailure };

export { getVehicles };
export { getVehiclesAsync };
export { getVehiclesSuccess };
export { getVehiclesFailure };

// Services
export { addServicesInit };
export { addServices };
export { addServicesSuccess };
export { addServicesFailure };

// Home page get all calls
export { getAllVehicles };
export { getAllVehiclesAsync };
export { getAllVehiclesSuccess };
export { getAllVehiclesFailure };

export { getAllServices };
export { getAllServicesAsync };
export { getAllServicesSuccess };
export { getAllServicesFailure };
