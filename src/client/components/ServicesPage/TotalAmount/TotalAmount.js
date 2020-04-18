import React from 'react';
import styles from './TotalAmount.css';
import { formatCurrency } from '../../../utils/Helpers';

const TotalAmount = ({ services }) => {
    if (!services || services.length === 0) {
        return null;
    }
    return (
        <div className={styles['total-amount']}>
            Total Amount: {getTotalAmount(services)}
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
    return formatCurrency(totalAmount, 2);
};

export default TotalAmount;
