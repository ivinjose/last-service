import HomePage from '../components/HomePage';
import VehicleDirectory from "../components/VehicleDirectory";
import ServicesPage from '../components/ServicesPage';
import AddDocument from '../components/AddDocument';
import AddServiceDetails from '../components/AddServiceDetails';
import AddVehicleDetails from '../components/AddVehicleDetails';
import Signup from '../components/Signup';
import LoginPage from '../components/LoginPage';
import Logout from '../components/Logout';

const routeConstants = {
    HOME: 'HOME',
    VEHICLE_DIRECTORY: 'VEHICLE_DIRECTORY', 
    VIEW_SERVICES: 'VIEW_SERVICES',
    ADD_SERVICE_DETAILS: 'ADD_SERVICE_DETAILS',
    ADD_VEHICLE_DETAILS: 'ADD_VEHICLE_DETAILS',
    ADD_DOCUMENT: 'ADD_DOCUMENT'
}

const routes = [
    {
        key: 'HOME',
        path: "/",
        name: "HomePage",
        component: HomePage,
        isSecure: true
    },
    {
        key: 'VEHICLE_DIRECTORY',
        path: "/vehicle",
        name: "Vehicle Directory",
        component: VehicleDirectory,
        isSecure: true
    },
    {
        key: 'VIEW_SERVICES',
        path: "/services",
        name: "View Services",
        component: ServicesPage,
        isSecure: true
    },
    {
        key: 'ADD_SERVICE_DETAILS',
        path: "/services/add",
        name: "Add New Service",
        component: AddServiceDetails,
        isSecure: true
    },
    {
        key: 'ADD_DOCUMENT',
        path: "/document/add",
        name: "Add New Document",
        component: AddDocument,
        isSecure: true
    },
    {
        key: 'ADD_VEHICLE_DETAILS',
        path: "/vehicles/add",
        name: "Add New Vehicle",
        component: AddVehicleDetails,
        isSecure: true
    },
    {
        key: 'SIGNUP',
        path: "/signup",
        name: "Create account",
        component: Signup,
        isSecure: false
    },
    {
        key: 'LOGIN',
        path: "/login",
        name: "Login",
        component: LoginPage,
        isSecure: false
    },
    {
        key: 'LOGOUT',
        path: "/logout",
        name: "Logout",
        component: Logout,
        isSecure: true
    }  
];

function getRouteDetails(searchRouteKey){
    return routes.find((routeObj)=>{
        return routeObj.key === searchRouteKey;
    })
}

export { routes, routeConstants, getRouteDetails };