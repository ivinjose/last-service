import Home from '../components/Home';
import ViewServiceDetails from '../components/ViewServiceDetails';
import AddServiceDetails from '../components/AddServiceDetails';
import AddVehicleDetails from '../components/AddVehicleDetails';
import Login from '../components/Login';

const routeConstants = {
    HOME: 'HOME',
    VIEW_SERVICES: 'VIEW_SERVICES',
    ADD_SERVICE_DETAILS: 'ADD_SERVICE_DETAILS',
    ADD_VEHICLE_DETAILS: 'ADD_VEHICLE_DETAILS'
}

const routes = [
    {
        key: 'HOME',
        path: "/",
        name: "Home",
        component: Home
    },
    {
        key: 'VIEW_SERVICES',
        path: "/services",
        name: "View Service Details",
        component: ViewServiceDetails
    },
    {
        key: 'ADD_SERVICE_DETAILS',
        path: "/services/add",
        name: "Add Service Details",
        component: AddServiceDetails
    },
    {
        key: 'ADD_VEHICLE_DETAILS',
        path: "/vehicles/add",
        name: "Add Vehicle Details",
        component: AddVehicleDetails
    },
    {
        key: 'LOGIN',
        path: "/login",
        name: "Login",
        component: Login
    },
];

function getRouteDetails(searchRouteKey){
    return routes.find((routeObj)=>{
        return routeObj.key === searchRouteKey;
    })
}

export { routes, routeConstants, getRouteDetails };