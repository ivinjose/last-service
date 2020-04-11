import React from 'react'
import PropTypes from 'prop-types'
import Styles from './Header.css'
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
import userIcon from "../../../images/user.svg"
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
        justifyContent: 'space-between',
        marginTop: '10px'
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
        <div className={Styles['header']}>
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
                <span className={Styles['title']}>
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
                    <User {...user} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </div>
                
                <ul className={Styles['list']}>
                    {routes.map((route) => {
                        const liClassName = clsx( Styles['list-item'], location.pathname == route.path? Styles['selected']:null );
                        if(route.isSecure !== user.isLoggedIn ){
                            return null;
                        }
                        return (
                            <React.Fragment key={route.key}>
                                <Link to={route.path} className={Styles['list-link']} onClick={handleDrawerClose}>
                                    <li className={liClassName} key={route.name}>
                                        <span className={Styles['text']}>{route.name}</span>
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

const User = ({name, id}) => {
    return(
        <div className={Styles['user']}>
            <div className={Styles['image']}>
                <img src={userIcon} />
            </div>
            <div className={Styles['info']}>
                <div className={Styles['name']}>
                    {name}
                </div>
                <div className={Styles['id']}>
                    {id}
                </div>
            </div>
        </div>
    );
};

Header.contextTypes = {
    store: PropTypes.object,
}

export default Header