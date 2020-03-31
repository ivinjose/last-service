import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Vehicle.css';
import DataConstants from "../../../constants/DataConstants";
import car from '../../../images/car.png';
import bike from '../../../images/bike.png';

const Vehicle = (vehicle) => {
	const image = vehicle.image || getImage(vehicle.type);
	return(
		<div className={styles['vehicle']}>
			<Link className={styles['link']} to={"/services?vehicle="+vehicle._id}>
				<div className={styles['details']}>
					<div className={styles['image-block']}>
						<img src={image} />
					</div>
					<div className={styles['info']}>
						<div className={styles['name']}>{vehicle.name}</div>
						<div className={styles['subtext']}>Could be anything</div>
					</div>
				</div>	
			</Link>
			<div className={styles['menu']}>=</div>
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