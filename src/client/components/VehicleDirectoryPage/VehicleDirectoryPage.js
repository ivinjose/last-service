import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import styles from './VehicleDirectoryPage.css';
import Header from '../common/Header';
import Card from '../common/Card';
import Space from '../common/Stylers/Space';
import { Link } from 'react-router-dom';
import service from "../../images/service.svg";
import document from "../../images/document.svg";
import reminder from "../../images/reminder.svg";
import useStoreon from 'storeon/react';
import { getVehicleNameFromList } from '../../utils/Helpers';

const cardCustomStyle = {
    height: '200px',
    width: '275px'
};

const VehicleDirectoryPage = (props) => {
    const { vehicles } = useStoreon('vehicles');
    const [ vehicle, setVehicle ] = useState("");

    useEffect(()=>{
        const queryParams = queryString.parse(props.location.search);
		if (queryParams && queryParams.vehicle) {
            const currentVehicle = getVehicleNameFromList(queryParams.vehicle, vehicles);
			setVehicle(currentVehicle.name);
		}
    }, []);

    return(
        <React.Fragment>
            <Header title={vehicle} />
            <div className={styles['vehicle-directory-page']}>
                {/* VehicleDirectory vehicle info here */}
                <Space vertical={15} />
                <div className={styles['cards']}>
                    <Card style={cardCustomStyle}>
                        <CardContent link="/services" linkText="SERVICES" message="You have 2 services due!" icon={service} />
                    </Card>
                    <Space vertical={25} />
                    <Card style={cardCustomStyle}>
                        <CardContent link="/documents" linkText="DOCUMENTS" message="You have 1 document for renewal!" icon={document} />
                    </Card>
                    <Space vertical={25} />
                    <Card style={cardCustomStyle}>
                        <CardContent link="/reminder" linkText="REMINDERS" message="You have 0 reminders!" icon={reminder} />
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
};

const CardContent = ({message, link, linkText, icon}) => {
    return(
        <div className={styles['card-content']}>
            <div className={styles['icon']}>
                <img src={icon} />
            </div>
            <div className={styles['message']}>
                {message}
            </div>
            <div className={styles['footer']}>
                <Link to={link} className={styles['link']}>{linkText}</Link>
            </div>
        </div>
    );
};

export default VehicleDirectoryPage;