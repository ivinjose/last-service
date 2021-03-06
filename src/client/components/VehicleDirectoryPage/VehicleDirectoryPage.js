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
    height: '165px',
    width: '100%'
};

const VehicleDirectoryPage = (props) => {
    const { vehicles } = useStoreon('vehicles');
    const [ vehicle, setVehicle ] = useState({});
    const vehicleName = vehicle.name? vehicle.name.toUpperCase() : "";

    useEffect(()=>{
        const queryParams = queryString.parse(props.location.search);
		if (queryParams && queryParams.vehicle) {
            const vehicle = getVehicleNameFromList(queryParams.vehicle, vehicles);
			if(vehicle){
                setVehicle(vehicle);
            }else{
                props.history.replace("/");
            }
		}else{
            props.history.replace("/");
        }
    }, []);

    return(
        <React.Fragment>
            <Header title={vehicleName} />
            <div className={styles['vehicle-directory-page']}>
                {/* VehicleDirectory vehicle info here */}
                <Space vertical={15} />
                <div className={styles['cards']}>
                    <Card style={cardCustomStyle}>
                        <CardContent link={"/services?vehicle="+vehicle._id} linkText="SERVICES" message="You have 2 services due!" icon={service} />
                    </Card>
                    <Space vertical={25} />
                    <Card style={cardCustomStyle}>
                        <CardContent link={"/documents?vehicle="+vehicle._id} linkText="DOCUMENTS" message="You have 1 document for renewal!" icon={document} />
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
        <Link to={link} className={styles['link']}>
            <div className={styles['card-content']}>
                <div className={styles['icon']}><img src={icon} /></div>
                <div className={styles['message']}>{message}</div>
                <div className={styles['footer']}>{linkText}</div>
            </div>
        </Link>
    );
};

export default VehicleDirectoryPage;