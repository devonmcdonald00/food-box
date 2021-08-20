import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
        height: 70,
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
        width: 50
    }
  }));

export default function Appbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" style={{alignSelf: 'center', margin: 'auto', fontWeight: 700}}>
                    Food Box Delivery
                </Typography>
                <img src='https://static.thenounproject.com/png/98709-200.png' alt='' className={classes.foodImage}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}
