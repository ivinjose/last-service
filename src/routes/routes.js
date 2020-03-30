import Home from '../components/Home';
import ViewServiceDetails from '../components/ViewServiceDetails';
import AddServiceDetails from '../components/AddServiceDetails';
import AddVehicleDetails from '../components/AddVehicleDetails';
import Login from '../components/Login';
import Signup from '../components/Signup';

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
        component: Home,
        isSecure: true
    },
    {
        key: 'VIEW_SERVICES',
        path: "/services",
        name: "View Service Details",
        component: ViewServiceDetails,
        isSecure: true
    },
    {
        key: 'ADD_SERVICE_DETAILS',
        path: "/services/add",
        name: "Add Service Details",
        component: AddServiceDetails,
        isSecure: true
    },
    {
        key: 'ADD_VEHICLE_DETAILS',
        path: "/vehicles/add",
        name: "Add Vehicle Details",
        component: AddVehicleDetails,
        isSecure: true
    },
    {
        key: 'LOGIN',
        path: "/login",
        name: "Login",
        component: Login,
        isSecure: false
    },
    {
        key: 'SIGNUP',
        path: "/signup",
        name: "Signup",
        component: Signup,
        isSecure: false
    }
];

function getRouteDetails(searchRouteKey){
    return routes.find((routeObj)=>{
        return routeObj.key === searchRouteKey;
    })
}

export { routes, routeConstants, getRouteDetails };