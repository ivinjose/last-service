import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './ServiceDetails.css';
import globalStyles from '../../styles/global.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class ServiceDetails extends React.Component {
	constructor() {
		super();
	}

  formatDate(date){
	   return new Date(date).toLocaleDateString(); // Todo
    };
	render() {
        const me =this;
	    const data = this.props.data;
		if( data.length === 0 ){
			return(
				<div>No data available!</div>
			)
		}
		return (

		    <div ref="serviceItem" className="service-details">
                {data.map(function (serviceDetail, index) {
                    return (<Card key={index} style ={{marginBottom:'5px'}}>
                        <CardHeader
                            title={serviceDetail.itemService}
                            subtitle={me.formatDate(serviceDetail.date)}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardText expandable={true}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>Amount</td>
                                        <td>{serviceDetail.amount}</td>
                                    </tr>
                                    <tr>
                                        <td>{serviceDetail.vehicle}</td>
                                        <td>{serviceDetail.itemName}</td>
                                        <td>{serviceDetail.itemService}</td>
                                        <td>{serviceDetail.kmsReading} kms</td>
                                    </tr>
                                    </tbody>
                                </table>
                        </CardText>
                    </Card>)
                })
                }
                </div>
        );

	}
}

export default ServiceDetails;