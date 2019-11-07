import React, { PureComponent } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Header from '../common/Header'
import styles from './ViewServiceReports.css'
import globalStyles from '../../styles/global.css'

const mapData = data =>
    data
        .map(({ amount, component }) => {
            return {
            name: component,
            value: !isNaN(parseInt(amount)) ? parseInt(amount): 100,
        }})
        .sort(({ value: a }, { value: b }) => {
            return b - a
        })

const COLORS = ['#FF333F', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const colorPicker = ({ value }, index) => {
    return COLORS[index % COLORS.length]
}
export default class ViewServiceReports extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            serviceDetails: [],
            vehicles: [],
            currentVehicle: '',
            loading: true,
        }
        this.chooseVehicle = this.chooseVehicle.bind(this)
    }

    chooseVehicle(id) {
        this.setState({
            currentVehicle: id,
        })
    }

    getVehiclesList() {
        var _this = this
        fetch('http://localhost:4001/users/5a86de0b90d792bccf3c3404/vehicles', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function(response) {
                return response.text()
            })
            .then(function(response) {
                return JSON.parse(response)
            })
            .then(function(response) {
                _this.setState({
                    vehicles: response.data || [],
                    loading: false,
                })
            })
            .catch(function(error) {
                this.setState({ laoding: false })
                console.log(
                    'Error in ViewServiceDetails - getVehiclesList ',
                    error
                )
            })
    }

    getServiceDetailsOf(vehicle) {
        var _this = this
        fetch(`http://localhost:4001/vehicles/${vehicle}/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function(response) {
                return response.text()
            })
            .then(function(response) {
                return JSON.parse(response)
            })
            .then(function(response) {
                _this.setState({
                    serviceDetails: response.data || [],
                    loading: false,
                })
            })
            .catch(function(error) {
                this.setState({ loading: false })
                console.log(
                    'Error in ViewServiceDetails - getServiceDetailsOf ',
                    error
                )
            })
    }

    componentDidMount() {
        this.getVehiclesList()
    }

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.currentVehicle !== prevState.currentVehicle) {
            this.getServiceDetailsOf(this.state.currentVehicle)
        }
    }
    render() {
        let placeHolderItem = (
            <MenuItem disabled value="" key="chooseVehicle">
                <em>Choose Vehicle</em>
            </MenuItem>
        )
        const menuItems = [
            placeHolderItem,
            ...this.state.vehicles.map(vehicle => (
                <MenuItem value={vehicle._id} key={vehicle._id}>
                    {vehicle.name}
                </MenuItem>
            )),
        ]
        const data = mapData(this.state.serviceDetails)
        return (
            <div>
                <Header title={'View service details'} />
                <div className={styles['body']}>
                    <div className={globalStyles['row']}>
                        <Select
                            displayEmpty
                            value={this.state.currentVehicle}
                            onChange={e => this.chooseVehicle(e.target.value)}
                            className={styles['select-cmp']}
                        >
                            {menuItems}
                        </Select>
                    </div>
                    {this.state.serviceDetails.length !== 0 ? (
                        <div className={styles['chart-container']}>
                                <PieChart width={400} height={400}>>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={false}
                                        data={data}
                                        cx={200}
                                        cy={200}
                                        outerRadius={'60%'}
                                        fill="#8884d8"
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colorPicker(entry, index)}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                        </div>
                    ) : (
                        <div>No data ...</div>
                    )}
                </div>
            </div>
        )
    }
}
