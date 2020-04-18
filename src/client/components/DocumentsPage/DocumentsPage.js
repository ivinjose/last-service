import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import Header from '../common/Header';
import Space from '../common/Stylers/Space';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Document, { DocumentEmpty } from '../common/Document';
import useStoreon from 'storeon/react'
import styles from './DocumentsPage.css';
import lizard from '../../images/lizard.jpg';
import Strings from '../../constants/StringConstants';
import { prettifyDate } from "../../utils/Helpers";

const DocumentsPage = (props) => {
	const { user, documents, vehicles, loading, dispatch } = useStoreon('user', 'documents', 'vehicles', 'loading');

	const [ vehicle, setVehicle ] = useState("");
	const setVehicleCb = event => {
		setVehicle(event.target.value);
		getDocumentsOfVehicle(event.target.value);
	} 

	useEffect(()=>{
		getDocuments();
		const queryParams = queryString.parse(props.location.search);
		if (queryParams && queryParams.vehicle) {
			setVehicle(queryParams.vehicle);
			getDocumentsOfVehicle(queryParams.vehicle);
		}
	}, []);

	const getDocuments = () =>  dispatch('documents/get', user._id);
	const getDocumentsOfVehicle = selectedVehicle => dispatch('documents/vehicle/get', selectedVehicle);

	const placeHolderItem = <MenuItem disabled value="" key='chooseVehicle'><em>Choose Vehicle</em></MenuItem>;
	const menuItems = [placeHolderItem, ...vehicles.map((vehicle) => (
		<MenuItem value={vehicle._id} key={vehicle._id} >
			{vehicle.name}
		</MenuItem>
	))];

	return (
		<React.Fragment>
			<Header title={Strings.PAGE_TITLES.DOCUMENTS} />
			<div className={styles['documents-page']}>
				<Space vertical={15} />
				<Select
					displayEmpty
					value={vehicle}
					onChange={setVehicleCb}
					className={styles['select-cmp']}>
					{menuItems}
				</Select>
				
				<Space vertical={15} />
				{renderDocument(documents, vehicles, loading)}
			</div>
		</React.Fragment>
	);
}

const renderDocument = (documents, vehicles, loading) =>{
	if( loading ){
		return <Loader />
	}else{
		if( documents.length == 0 ){
			return <Empty />;
		}else{
			return(
				<React.Fragment>
					{
						documents.map( document =>{
							document.renewalDate = prettifyDate(document.renewalDate);
							document.reminderDate = prettifyDate(document.reminderDate);
							const vehicle = vehicles.find( vehicle => vehicle._id === document.vehicle );
							document.vehicle = vehicle.name;
							return <Document document={document} />
						})
					}
				</React.Fragment>
			)
		}
	}
}

const Loader = () => {
	return (
		<React.Fragment>
			<DocumentEmpty />
			<DocumentEmpty />
		</React.Fragment>
	);
}

const Empty = () => {
	return (
		<div className={styles['empty']}>
			<img className={styles['image']} src={lizard} />
			<div>It's so empty in here!</div>
		</div>
	);
};

export default DocumentsPage;