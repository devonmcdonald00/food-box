import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@material-ui/core'
import SignInForm from '../../components/SignInForm';
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
export default function SignInPage() {
    const classes = useStyles();
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper className={classes.formRoot}>
                <Typography className={classes.signInTitle}>Sign In</Typography>
                <SignInForm/>
            </Paper>
        </div>
    )
}
