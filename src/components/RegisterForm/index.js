import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';


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

export default function RegisterForm() {
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
                <StyledTextField
                    required
                    id="confirm-password"
                    label="Confirm Password"
                    placeholder="input password again"
                    className={classes.textfields}
                />
           </form>
        </div>
    )
}
