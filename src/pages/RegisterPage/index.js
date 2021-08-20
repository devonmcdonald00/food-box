import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@material-ui/core'
import RegisterForm from '../../components/RegisterForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 100,
        width: 500,
    },
    signInTitle: {
        fontSize: 25,
        color: '#013220',
        paddingTop: 20,
        paddingBottom: 5
    },
}))
export default function RegisterPage() {
    const classes = useStyles();
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper className={classes.formRoot} elevation={3}>
                <Typography className={classes.signInTitle}>Register</Typography>
                <RegisterForm/>
            </Paper>
        </div>
    )
}
