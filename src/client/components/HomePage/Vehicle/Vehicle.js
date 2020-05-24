import React from 'react';
import styles from './Vehicle.css';
import DataConstants from "../../../constants/DataConstants";
import car from '../../../images/car.png';
import bike from '../../../images/bike.png';

const Vehicle = (vehicle) => {
	const image = vehicle.image || getImage(vehicle.type);
	return(
		<div className={styles['vehicle']}>
			<div className={styles['details']}>
				<div className={styles['image-block']}>
					<img src={image} />
				</div>
				<div className={styles['info']}>
					<div className={styles['name']}>{vehicle.name}</div>
					{vehicle.subtext && <div className={styles['subtext']}>{vehicle.subtext}</div>}
				</div>
			</div>	
			{/* <div className={styles['menu']}>=</div> */}
		</div>
	)
}

const VehicleEmpty = () => {
	return(
		<div className={styles['vehicle-empty']}>
			<div className={styles['details']}>
				<div className={styles['image-block']}></div>
				<div className={styles['info']}>
					<div className={styles['name']}></div>
					<div className={styles['subtext']}></div>
				</div>
			</div>	
		</div>
	)
}

const getImage = (type) =>{
	let icon;
	switch (type){
		case DataConstants.FOUR_WHEELER:
			icon = car;
			break;
		case DataConstants.TWO_WHEELER:
			icon = bike;
			break;
	}
	return icon;
}

export default Vehicle;
export { VehicleEmpty };