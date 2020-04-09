import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.css'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

import {routes} from '../../../routes/routes'
import useStoreon from 'storeon/react'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: '5px',
        color: '#01376d'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}))

function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [isDrawerOpen, openDrawer] = React.useState(false)
    const { user } = useStoreon('user');
    const location = useLocation();

    function handleDrawerOpen() {
        openDrawer(true)
    }

    function handleDrawerClose() {
        openDrawer(false)
    }

    return (
        <div className={styles['header']}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(
                        classes.menuButton,
                        isDrawerOpen && classes.hide
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <span className={styles['title']}>
                    {props.title}
                </span>
            </Toolbar>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={isDrawerOpen}
                onClose={handleDrawerClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                
                <ul className={styles['list']}>
                    {routes.map((route) => {
                        const liClassName = clsx( styles['list-item'], location.pathname == route.path? styles['selected']:null );
                        if(route.isSecure !== user.isLoggedIn ){
                            return null;
                        }
                        return (
                            <React.Fragment key={route.key}>
                                <Link to={route.path} className={styles['list-link']} onClick={handleDrawerClose}>
                                    <li className={liClassName} key={route.name}>
                                        <span className={styles['text']}>{route.name}</span>
                                    </li>
                                </Link>
                            </React.Fragment>
                        )
                    })}
                </ul>
            </Drawer>
        </div>
    )
}

Header.contextTypes = {
    store: PropTypes.object,
}

export default Header