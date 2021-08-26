import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        background: '#aaf0d1',
        color: '#013220'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    foodImage: {
        height: 50,
        width: 50,
        marginLeft: 12,
    },
    toolBar: {
        justifyContent: 'space-between'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
  }));

  const StyledBadge = withStyles((theme) => ({
    badge: {
      left: -3,
      border: `1px solid gray`,
      padding: '4px 4px',
      background: `${theme.palette.background.paper}`,
      color: 'black',
    },
  }))(Badge);

export default function Appbar(props) {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(0);
    const history = useHistory();

    useEffect(() => {}, [])

    const doAction = (action) => {
        if(action === 'home'){
            setOpenMenu(0)
            history.push('/food-box-home')
        }
        if(action === 'logout'){
            setOpenMenu(0)
            localStorage.removeItem('user')
            localStorage.removeItem('admin')
            history.push('/')
        }
        if(action === 'admin'){
            setOpenMenu(0);
            history.push('/admin')
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <div style={{display: 'flex'}}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setOpenMenu(1)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{alignSelf: 'center', margin: 'auto', fontWeight: 500}}>
                            <Link to='/' style={{color: 'black', fontSize: 22, fontFamily: 'Staatliches'}}>
                                Food Box Delivery
                            </Link>
                        </Typography>
                        <img src='https://static.thenounproject.com/png/98709-200.png' alt='' className={classes.foodImage}/>
                    </div>
                    <div style={{display: 'flex'}}>
                        {
                            localStorage.getItem('user') !== null ?
                            <Typography style={{alignSelf: 'center', marginRight: 10}}>
                                Welcome {JSON.parse(localStorage.getItem('user'))['username']}!
                            </Typography>
                            :
                            <></>
                        }
                        {
                            localStorage.getItem('cart') !== null &&
                            <Link style={{margin: 'auto', color: 'black', position: 'relative'}} to='/cart'>
                                <IconButton>
                                    <StyledBadge badgeContent={props.cartCounter} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </Link>
                        }
                    </div>
                </Toolbar>
                <Drawer anchor={'left'} open={openMenu} onClose={() => setOpenMenu(0)} >
                    <List className={classes.list}>
                        <ListItem button key={'Home'} style={{borderBottom: '1px solid lightgray'}} onClick={() => doAction('home')}>
                            <ListItemIcon style={{minWidth: 35}}>
                                <HomeIcon/>
                            </ListItemIcon>
                            <Typography>Home</Typography>
                        </ListItem>
                        <ListItem button key={'Logout'} style={{borderBottom: '1px solid lightgray'}} onClick={() => doAction('logout')}>
                            <ListItemIcon style={{minWidth: 35}}>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                            <Typography>Logout</Typography>
                        </ListItem>
                        {
                            localStorage.getItem('admin') !== null && JSON.parse(localStorage.getItem('admin'))['admin'] &&
                            <ListItem button key={'Admin'} style={{borderBottom: '1px solid lightgray'}} onClick={() => doAction('admin')}>
                                <ListItemIcon style={{minWidth: 35}}>
                                    <SupervisorAccountIcon/>
                                </ListItemIcon>
                                <Typography>Admin</Typography>
                            </ListItem>
                        }
                    </List>
                </Drawer>
            </AppBar>
        </div>
    )
}
