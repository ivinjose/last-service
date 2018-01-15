import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.css';
import Header from '../common/Header';
import ServiceDetails from '../ServiceDetails';
import AddServiceDetails from '../AddServiceDetails';
import VehicleCard from '../common/VehicleCard';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import fetch from 'isomorphic-fetch';
import functions from './functions';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			vehicles: [],
			loading: false
		};
	}

	componentDidMount(){
		this.setState({ loading: true });
		functions.getVehiclesList().then((response)=>{
			this.setState({
				loading: false,
				vehicles: response
			});
		});
	}
 
	render() {
		if( this.state.loading ){
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					<div className={styles['loader']}>
						<RefreshIndicator
							size={50}
							left={70}
							top={0}
							loadingColor="#FF9800"
							status="loading"
							style={{display: 'inline-block',position: 'relative'}}/>
					</div>
				</div>
			)
		}
		else if( this.state && this.state.vehicles && this.state.vehicles.length>0 ){
			return (
				<div className={styles['home']}>
					<Header title={"Service Manager"}/>
					
					<div className={styles['body']}>
						{
							this.state.vehicles.map(function(vehicle, index){
								return(
									<div className={styles['vehicle']} key={index}>
										<VehicleCard data={vehicle} index={index} showEdit={false}/>
									</div>
								)
							})
						}
						<div className={styles['cta']}>
							<FloatingActionButton secondary={true} onClick={functions.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
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
							<FloatingActionButton onClick={functions.addNew.bind(this)}>
								<ContentAdd />
							</FloatingActionButton>
						</div>
					</div>
				</div>
			)
		}
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

export default Home;