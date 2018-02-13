import React from 'react';
import ReactDOM from 'react-dom';
import styles from './SubHeader.css';

class SubHeader extends React.Component {
	render() {
		return (
			<h1 className={styles['sub-header']}>{this.props.text}</h1>
		);
	}
}

export default SubHeader;