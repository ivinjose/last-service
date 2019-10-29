import React from 'react';
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
    if (data && data.length === 0) {
        return null;
    }
    return (
        <div className={styles['amount-cmp']}>
            <span className={styles['amount']}>
                Total Amount : {getTotalAmount(data)}
            </span>
        </div>
    );
};

export default TotalAmount;
