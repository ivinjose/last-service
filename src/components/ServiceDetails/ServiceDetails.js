import React from 'react';
import styles from './ServiceDetails.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';

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
        const me = this;
        const data = this.props.data;
        if (data.length === 0) {
            return (
                <div>No data available!</div>
            );
        }

        return (
		    <div ref="serviceItem" className={styles['service-details']}>
                {data.map(function (serviceDetail, index) {
                    const dateTime = me.formatDateTime(serviceDetail.date);
                    return (<Card key={index} style ={{marginBottom: '5px'}}>
                        <CardHeader
                            title={dateTime.date}
                            subtitle={dateTime.time}
                            actAsExpander
                            showExpandableButton
                        />
                        <CardText expandable>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={styles['Col']}>Amount</td>
                                        <td className={styles['Col-Details']}><span>{serviceDetail.amount}</span></td>
                                    </tr>
                                    <tr>
                                        <td className={styles['Col']}>Component</td>
                                        <td className={styles['Col-Details']}><span>{serviceDetail.component}</span></td>
                                    </tr>
                                    <tr>
                                        <td className={styles['Col']}>Distance</td>
                                        <td className={styles['Col-Details']}><span>{serviceDetail.kmsReading} kms</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles['CommentsSection']}>
                                <div className={styles['Header']}><span>Comments</span></div>
                                <div className={styles['Comments']}>" <span>{serviceDetail.comments}</span> "</div>
                            </div>
                        </CardText>
                    </Card>);
                })
                }
            </div>
        );
    }
}

export default ServiceDetails;
