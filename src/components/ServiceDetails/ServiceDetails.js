import React from 'react';
import styles from './ServiceDetails.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import svg from '../../images/notfound.svg';
import ServiceDetailsCard from './ServiceDetailCard';

class ServiceDetails extends React.Component {
    constructor(props) {
        super();
        this.formatDateTime = this.formatDateTime.bind(this);
    }

    formatDateTime (date) {
        const newDate = new Date(date);
        return {
            date: newDate.toLocaleDateString(),
            time: newDate.toLocaleTimeString()
        };
    };

    render() {
        if (this.props.data.length === 0) {
            return (
                <div className={styles['service-details']}>
                    <div className={styles['NoDataFound']}>
                        <div className={styles['Header']}>
                            <h3>"Oops! no data available"</h3>
                        </div>
                        <div className={styles['Avatar']}>
                            <img src={`/images/${svg}`}/>
                        </div>
                    </div>
                </div>
            );
        }

        return (
		    <div ref="serviceItem" className={styles['service-details']}>
                {
                    this.props.data.map( (service, index)=>{
                        return <ServiceDetailsCard key={index} service={service} />
                    })
                }
            </div>
        );
    }
}

export default ServiceDetails;
