import React from 'react';
import styles from './TotalAmount.css';

const TotalAmount = ({ services }) => {
    if (!services || services.length === 0) {
        return null;
    }
    return (
        <div className={styles['total-amount']}>
            Total Amount : {getTotalAmount(services)}
        </div>
    );
};

const getTotalAmount = services => {
    let totalAmount = 0;
    services.forEach(service => {
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

export default TotalAmount;
