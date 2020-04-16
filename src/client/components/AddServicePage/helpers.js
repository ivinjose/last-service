import queryString from 'query-string';
import { prettifyDate } from "../../utils/Helpers";

export const getVehicleFromLocation = location => {
	const queryParams = queryString.parse(location.search);
	if (queryParams && queryParams.vehicle) {
		return queryParams.vehicle;
	}
	return null;
};

export const mutateNewServiceForDisplay = (newService, vehicles, components ) => {
	const vehicle = vehicles.find( vehicle => vehicle._id === newService.vehicle );
	const component = components.find( component => component.id === newService.component );
	const prettifiedDate = prettifyDate(newService.date);
	return Object.assign({}, newService, { vehicle: vehicle.name, component: component.label, date: prettifiedDate });
}