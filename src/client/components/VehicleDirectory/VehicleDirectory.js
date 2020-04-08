import React from 'react';
import styles from './VehicleDirectory.css';

import Header from '../common/Header';
import Card from '../common/Card';
import Space from '../common/Stylers/Space';
import { Link } from 'react-router-dom';

import BuildIcon from '@material-ui/icons/Build';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import AddAlertIcon from '@material-ui/icons/AddAlert';

const VehicleDirectory = () => {
    const cardCustomStyle = {
        height: '250px',
        width: '200px'
    };
    return(
        <React.Fragment>
            <Header title={'Vehicle Directory'} />
            <div className={styles['directory']}>
                VehicleDirectory vehicle info here
                <div className={styles['cards']}>
                    <Card style={cardCustomStyle}>
                        <CardContent link="/services" linkText="SERVICES" message="You have 2 services due!" icon={<BuildIcon fontSize="large" color="action" />} />
                    </Card>
                    <Space vertical={15} />
                    <Card style={cardCustomStyle}>
                        <CardContent link="/documents" linkText="DOCUMENTS" message="You have 1 document for renewal!" icon={<DescriptionOutlinedIcon fontSize="large" color="action" />} />
                    </Card>
                    <Space vertical={15} />
                    <Card style={cardCustomStyle}>
                        <CardContent link="/reminder" linkText="REMINDERS" message="You have 0 reminders!" icon={<AddAlertIcon fontSize="large" color="action" />} />
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
                {icon}
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

export default VehicleDirectory;