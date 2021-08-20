import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core'
import SignInForm from '../../components/SignInForm';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formRoot: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 100,
        width: 'fit-content'
    },
    signInTitle: {
        fontSize: 25,
        color: '#013220',
    },
    buttonGroup : {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: 10
    }
}))
export default function SignInPage() {
    const classes = useStyles();
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className={classes.formRoot}>
                <Typography className={classes.signInTitle}>Sign In</Typography>
                <SignInForm/>
                <div className={classes.buttonGroup}>
                    <Button>Sign In</Button>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <Button>Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
