import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textfields: {
        margin: 8,
        width: 300
    },
    buttonGroup : {
        marginTop: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        padding: 10
    }
  }));

const StyledTextField = withStyles({
    root: {
        '& label.Mui-focused': {
          color: '#013220',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#013220',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#013220',
          },
          '&:hover fieldset': {
            borderColor: '#013220',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#013220',
          },
        },
    },

  })(TextField);

export default function SignInForm() {
    const classes = useStyles();
    return (
        <div>
           <form className={classes.root} noValidate>
            <StyledTextField
                    required
                    id="username"
                    label="Username"
                    placeholder="input username"
                    className={classes.textfields}
                />
                <StyledTextField
                    required
                    id="password"
                    label="Password"
                    placeholder="input password"
                    className={classes.textfields}
                />
                <div className={classes.buttonGroup}>
                    <Button style={{margin: 30, width: 'fit-content', background: '#aaf0d1'}}>Sign In</Button>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <Button style={{margin: 30, width: 'fit-content', background: '#aaf0d1'}}>Register</Button>
                    </Link>
                </div>
           </form>
        </div>
    )
}
