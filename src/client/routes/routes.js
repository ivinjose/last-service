import HomePage from '../components/HomePage';
import VehicleDirectoryPage from "../components/VehicleDirectoryPage";
import ServicesPage from '../components/ServicesPage';
import AddDocumentPage from '../components/AddDocumentPage';
import AddServicePage from '../components/AddServicePage';
import AddVehiclePage from '../components/AddVehiclePage';
import SignupPage from '../components/SignupPage';
import LoginPage from '../components/LoginPage';
import LogoutPage from '../components/LogoutPage';

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
        name: "Home",
        component: HomePage,
        isSecure: true
    },
    {
        key: 'VEHICLE_DIRECTORY',
        path: "/vehicle",
        name: "Vehicle Directory",
        component: VehicleDirectoryPage,
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
        component: AddServicePage,
        isSecure: true
    },
    {
        key: 'ADD_DOCUMENT',
        path: "/document/add",
        name: "Add New Document",
        component: AddDocumentPage,
        isSecure: true
    },
    {
        key: 'ADD_VEHICLE_DETAILS',
        path: "/vehicles/add",
        name: "Add New Vehicle",
        component: AddVehiclePage,
        isSecure: true
    },
    {
        key: 'SIGNUP',
        path: "/signup",
        name: "Create account",
        component: SignupPage,
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
        component: LogoutPage,
        isSecure: true
    }  
];

function getRouteDetails(searchRouteKey){
    return routes.find((routeObj)=>{
        return routeObj.key === searchRouteKey;
    })
}

export { routes, routeConstants, getRouteDetails };