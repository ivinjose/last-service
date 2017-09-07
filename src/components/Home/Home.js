import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'; 
import styles from './Home.css';
import Header from '../common/Header';
import ServiceDetails from '../ServiceDetails';
import AddServiceDetails from '../AddServiceDetails';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import routes from '../../routes/routes';

class Home extends React.Component {
	constructor() {
		super();
	}

	componentWillMount(){
		const { store } = this.context;
		store.subscribe( this.change.bind(this) );
	}

	change(){
		const { store } = this.context;
		let state = store.getState();
		this.setState({
			serviceDetails: state.appData.serviceDetails
		},function(){
			console.log(this.state.serviceDetails);
		});
	}
 
	render() {
		if( this.state && this.state.serviceDetails && this.state.serviceDetails.length>0 ){
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					<div className={styles['body']}>
						<ServiceDetails data={this.state.serviceDetails} />
					</div>
				</div>
			)
		}else{
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					<div className={styles['body']}>
						<Empty />
						<div className={styles['cta']}>
							<FloatingActionButton secondary={true} onClick={this.addNew.bind(this)} /*style={{ position: 'fixed', right: '25px', bottom: '25px'}}*/>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		}

		// return (
		// 	<div>
		// 		<AddServiceDetails />
		// 		{this.state && this.state.serviceDetails &&
		// 			<ServiceDetails data={this.state.serviceDetails} />
		// 		}
		// 	</div>
		// );
	}

	addNew(){
		browserHistory.push( routes[1].path );
	}
}

class Empty extends React.Component{
	constructor(){
		super();
	}

	render(){
		return (
			<div className={styles['empty']}>
				<div className={styles['text1']}>Uh oh!</div>
				<div className={styles['text2']}>It looks all empty in here.</div>
				<div className={styles['text3']}>Why don't you add some?</div>
			</div>
		);
	}
}

Home.contextTypes = {
	store: PropTypes.object
};

export default Home;