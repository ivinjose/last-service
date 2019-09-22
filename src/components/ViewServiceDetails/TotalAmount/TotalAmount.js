import React, { Fragment } from 'react';
import styles from './TotalAmount.css';

const getTotalAmount = data => {
    let totalAmount = 0;
    data.forEach(service => {
        const amount = Number(service.amount);
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });
    return totalAmount.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR',
    });
};

const TotalAmount = ({ data }) => {
    return (
        <Fragment>
            {data && data.length > 0 ? (
                <div className={styles['amount-cmp']}>
                    <div className={styles['amount']}>
                        Total Amount : {getTotalAmount(data)}
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default TotalAmount;
