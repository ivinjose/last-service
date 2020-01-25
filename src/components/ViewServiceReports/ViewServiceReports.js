import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Header from '../common/Header';
import styles from './ViewServiceReports.css';
import globalStyles from '../../styles/global.css';
import connect from 'storeon/react/connect';
import colorPicker from '../../utils/ColorPicker';
import mapData from '../../utils/PieChartHelper';

export class ViewServiceReports extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentVehicle: '',
        };
        this.chooseVehicle = this.chooseVehicle.bind(this);
    }

    chooseVehicle(id) {
        this.setState({
            currentVehicle: id,
        });
    }

    getVehiclesList() {
        const { dispatch, user } = this.props;
        dispatch('vehicles/get', user._id);
    }

    getServiceDetailsOf(vehicle) {
        const { dispatch } = this.props;
        dispatch('services/get', vehicle);
    }

    componentDidMount() {
        this.getVehiclesList();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.currentVehicle !== prevState.currentVehicle) {
            this.getServiceDetailsOf(this.state.currentVehicle);
        }
    }
    render() {
        const { vehicles, services, loading } = this.props;
        const { currentVehicle } = this.state;
        let emptyDataPlaceholder = null;

        if (currentVehicle !== '' && !loading) {
            emptyDataPlaceholder = <div className={styles['no-data']}>No data ...</div>;
        }

        let placeHolderItem = (
            <MenuItem disabled value="" key="chooseVehicle">
                <em>Choose Vehicle</em>
            </MenuItem>
        );
        const menuItems = [
            placeHolderItem,
            ...vehicles.map(vehicle => (
                <MenuItem value={vehicle._id} key={vehicle._id}>
                    {vehicle.name}
                </MenuItem>
            )),
        ];
        const data = mapData(services);
        return (
            <div>
                <Header title={'View service details'} />
                <div className={styles['body']}>
                    <div className={globalStyles['row']}>
                        <Select
                            displayEmpty
                            value={currentVehicle}
                            onChange={e => this.chooseVehicle(e.target.value)}
                            className={styles['select-cmp']}
                        >
                            {menuItems}
                        </Select>
                    </div>
                    {services.length !== 0 ? (
                        <div className={styles['chart-container']}>
                            <PieChart width={400} height={400}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    outerRadius={'65%'}
                                    fill="#8884d8"
                                    label
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={colorPicker(index)}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                    ) : (
                        emptyDataPlaceholder
                    )}
                </div>
            </div>
        );
    }
}

export default connect(
    'vehicles',
    'user',
    'services',
    'loading',
    ViewServiceReports
);
