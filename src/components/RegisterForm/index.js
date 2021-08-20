import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Message } from 'semantic-ui-react'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 20
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState({display: 0, header: "", message: ""});

    const addUser = async (e) => {
      console.log(e)
      e.preventDefault();
      if(e.target[1].value !== e.target[2].value){
          console.log("The password fields must match");
          setError({display: 1, header: "Confirm Password Must Match", message: "Make sure password and confirm password firelds match"})
      }
      else{
          const userExists = await fetch('http://localhost:8090/user_exists', {
              method: 'POST',
              mode: 'cors',
              headers : {
                  'Content-Type': 'application/json',
                  'Accept-Encoding': 'gzip, deflate, br',
              },
              body: JSON.stringify({
                  "username" : username
              })
          })
          const userExistsResponse = await userExists.json()
          console.log(userExistsResponse);
      }
        
    }

    return (
        <div>
           <form className={classes.root} onSubmit={e => addUser(e)}>
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
            <Button type="submit" style={{marginTop: 50, width: 'fit-content', background: '#aaf0d1'}}>Register</Button>
            {
              error.display ?
              <Message negative onClick={e => setError({display: 0, header: 0, message: 0})} style={{cursor: 'pointer'}}>
                <Message.Header>{error.header}</Message.Header>
                <p>{error.message}</p>
              </Message>
              : <></>
            }
           </form>
        </div>
    )
}
