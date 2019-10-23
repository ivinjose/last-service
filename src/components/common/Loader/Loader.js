import React from 'react';
import styles from  './Loader.css';
import useStoreon from 'storeon/react'

const Loader = () =>{
	const { loading } = useStoreon('loading');
	if( !loading ) return false;

	return(
		<div className={styles['overlay']}>
			<div className={styles['loader']}></div>
		</div>
	);
}
export default Loader;