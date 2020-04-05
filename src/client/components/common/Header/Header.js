import React from 'react'
import PropTypes from 'prop-types'
import styles from './Header.css'
import clsx from 'clsx'

import {routes} from '../../../routes/routes'
import useStoreon from 'storeon/react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}))

function Header(props) {
    const classes = useStyles()
    const theme = useTheme()
    const [isDrawerOpen, openDrawer] = React.useState(false)
    const { user } = useStoreon('user');

    function handleDrawerOpen() {
        openDrawer(true)
    }

    function handleDrawerClose() {
        openDrawer(false)
    }

    return (
        <div className={styles['header']}>
            <AppBar position="static" style={{backgroundColor: '#282c34'}}>
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
                    <Typography variant="h6" noWrap>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
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
                        if(route.isSecure !== user.isLoggedIn ){
                            return null;
                        }
                        return (
                            <React.Fragment key={route.key}>
                                <Link to={route.path} className={styles['list-link']} onClick={handleDrawerClose}>
                                    <li className={styles['list-item']} key={route.name}>
                                        <span className={styles['icon']}>&#8227;</span>
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
