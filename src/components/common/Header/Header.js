import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import styles from './Header.css'
import routes from '../../../routes/routes'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            isDrawerOpen: false,
        }
    }

    render() {
        return (
            <div className={styles['header']}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                   
                <AppBar position="static">
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Photos</Typography>
                </AppBar>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.state.isDrawerOpen}
                    value={1}
                    onRequestChange={isDrawerOpen =>
                        this.setState({ isDrawerOpen })
                    }
                >
                    <div className={styles['info-bar']}>
                        <div className={styles['user-image-placeholder']}>
                            <img
                                src="https://d30y9cdsu7xlg0.cloudfront.net/png/17241-200.png"
                                className={styles['image']}
                                alt="User image"
                            />
                        </div>
                        <div className={styles['username']}>Ivin Jose</div>
                        <div className={styles['email']}>
                            ivinjose@gmail.com
                        </div>
                    </div>
                    {routes.map((route, index) => {
                        return (
                            <MenuItem
                                value={1}
                                key={index}
                                onClick={this.changeRoute.bind(this, index)}
                            >
                                {route.name}
                            </MenuItem>
                        )
                    })}
                </Drawer>
            </div>
        )
    }

    openDrawer() {
        this.setState({
            isDrawerOpen: true,
        })
    }

    changeRoute(index) {
        this.setState(
            {
                isDrawerOpen: false,
            },
            () => {
                browserHistory.push(routes[index].path)
            }
        )
    }
}

Header.contextTypes = {
    store: PropTypes.object,
}

export default Header
