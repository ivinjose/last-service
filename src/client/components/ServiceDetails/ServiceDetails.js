import React from 'react';
import styles from './ServiceDetails.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import svg from '../../images/notfound.svg';

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
        const data = this.props.data;
        if (data && data.length === 0) {
            return (
                <div className={styles['service-details']}>
                    <div className={styles['NoDataFound']}>
                        <div className={styles['Header']}>
                            <span> <h3>"Oops! no data available"</h3></span>
                        </div>
                        <div className={styles['Avatar']}>
                            <img src={svg}/>
                        </div>
                    </div>
                </div>
            )
        }

        return (
		    <div ref="serviceItem" className={styles['service-details']}>
                {data && data.map( (serviceDetail, index)=>{
                    const dateTime = this.formatDateTime(serviceDetail.date);
                    return (<Card key={index} style ={{marginBottom: '5px'}} >
                        <CardHeader
                            title={dateTime.date}
                            subtitle={dateTime.time}
                        />
                        <Collapse in={true}>
                            <CardContent>
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
                            </CardContent>
                        </Collapse>
                    </Card>);
                })
                }
            </div>
        );
    }
}

export default ServiceDetails;