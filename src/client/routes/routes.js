import HomePage from '../components/HomePage';
import VehicleDirectoryPage from "../components/VehicleDirectoryPage";
import ServicesPage from '../components/ServicesPage';
import DocumentsPage from '../components/DocumentsPage';
import AddDocumentPage from '../components/AddDocumentPage';
import AddServicePage from '../components/AddServicePage';
import AddVehiclePage from '../components/AddVehiclePage';
import SignupPage from '../components/SignupPage';
import LoginPage from '../components/LoginPage';
import LogoutPage from '../components/LogoutPage';
import Strings from '../constants/StringConstants';

const routeConstants = {
    HOME: 'HOME',
    VEHICLE_DIRECTORY: 'VEHICLE_DIRECTORY', 
    VIEW_SERVICES: 'VIEW_SERVICES',
    VIEW_DOCUMENTS: 'VIEW_DOCUMENTS',
    ADD_SERVICE: 'ADD_SERVICE',
    ADD_VEHICLE: 'ADD_VEHICLE',
    ADD_DOCUMENT: 'ADD_DOCUMENT',
    EDIT_SERVICE: 'EDIT_SERVICE',
}

const routes = [
    {
        key: 'HOME',
        path: "/",
        name: Strings.URL_TITLES.HOME,
        title: Strings.PAGE_TITLES.HOME,
        component: HomePage,
        isSecure: true
    },
    {
        key: 'VEHICLE_DIRECTORY',
        path: "/vehicle",
        name: Strings.URL_TITLES.DIRECTORY,
        title: Strings.PAGE_TITLES.DIRECTORY,
        component: VehicleDirectoryPage,
        isSecure: true
    },
    {
        key: 'VIEW_SERVICES',
        path: "/services",
        name: Strings.URL_TITLES.SERVICES,
        title: Strings.PAGE_TITLES.SERVICES,
        component: ServicesPage,
        isSecure: true
    },
    {
        key: 'VIEW_DOCUMENTS',
        path: "/documents",
        name: Strings.URL_TITLES.DOCUMENTS,
        title: Strings.PAGE_TITLES.DOCUMENTS,
        component: DocumentsPage,
        isSecure: true
    },
    {
        key: 'ADD_SERVICE',
        path: "/services/add",
        name: Strings.URL_TITLES.ADD_SERVICE,
        title: Strings.PAGE_TITLES.ADD_SERVICE,
        component: AddServicePage,
        isSecure: true
    },
    {
        key: 'ADD_DOCUMENT',
        path: "/document/add",
        name: Strings.URL_TITLES.ADD_DOCUMENT,
        title: Strings.PAGE_TITLES.ADD_DOCUMENT,
        component: AddDocumentPage,
        isSecure: true
    },
    {
        key: 'ADD_VEHICLE',
        path: "/vehicles/add",
        name: Strings.URL_TITLES.ADD_VEHICLE,
        title: Strings.PAGE_TITLES.ADD_VEHICLE,
        component: AddVehiclePage,
        isSecure: true
    },
    {
        key: 'EDIT_SERVICE',
        path: "/services/edit",
        name: Strings.URL_TITLES.EDIT_SERVICE,
        title: Strings.PAGE_TITLES.EDIT_SERVICE,
        component: AddServicePage,
        isSecure: true,
        isHidden: false
    },
    {
        key: 'SIGNUP',
        path: "/signup",
        name: Strings.URL_TITLES.SIGNUP,
        title: Strings.PAGE_TITLES.SIGNUP,
        component: SignupPage,
        isSecure: false
    },
    {
        key: 'LOGIN',
        path: "/login",
        name: Strings.URL_TITLES.LOGIN,
        title: Strings.PAGE_TITLES.LOGIN,
        component: LoginPage,
        isSecure: false
    },
    {
        key: 'LOGOUT',
        path: "/logout",
        name: Strings.URL_TITLES.LOGOUT,
        component: LogoutPage,
        isSecure: true
    }  
];

const getRouteDetailsFromKey = key => routes.find( route => route.key === key );
const getRouteDetailsFromPath = path => routes.find( route => route.path === path );

export { routes, routeConstants, getRouteDetailsFromKey, getRouteDetailsFromPath };