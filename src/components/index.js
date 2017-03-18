import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import styles from '../styles/global.css';
 
document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(
		<Home />,
		document.getElementById('mount')
	);
});
