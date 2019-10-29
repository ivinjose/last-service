import React from 'react';
import styles from  './Loader.css';

const Loader = ({loading = false}) =>{
	if( !loading ) return null;
	return(
		<div className={styles['overlay']}>
			<div className={styles['loader']}></div>
		</div>
	);
}
export default Loader;