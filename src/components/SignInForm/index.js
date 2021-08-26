import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Message } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux';
import { set_signedIn } from '../../state/userSlice'


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

export default function SignInForm(props) {

    const [success, setSuccess] = useState(0);
    const [error, setError] = useState({display: 0, header: "", message: ""})
    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('user') !== null){
            if(JSON.parse(localStorage.getItem('user'))['signedIn']){
                history.push('/food-box-home')
            }
        }
        if(location.state){
            console.log(location.state.from)
            if(location.state.from === 'register'){
                setSuccess(1)
            }
        }
    }, []);

    const checkSignIn = async (e) => {
        e.preventDefault();

        const checkUser = await fetch('http://localhost:8090/user_exists', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                "username": e.target[0]['value'],
            })
        })
        const checkUserResponse = await checkUser.json();

        if(checkUserResponse){
            const checkSignIn = await fetch('http://localhost:8090/check_password', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
                body: JSON.stringify({
                    "username": e.target[0]['value'],
                    "password": e.target[1]['value']
                })
            })

            const signInResponse = await checkSignIn.json();
            console.log(signInResponse)
            if(signInResponse){
                console.log("successfully signed in");
                const user = JSON.stringify({
                    username: e.target[0]['value'],
                    signedIn: true
                })
                localStorage.setItem('user', user)
                history.push({pathname: '/food-box-home', state: {username: e.target[0]['value']}})
            }
            else{
                console.log("There was an error signing in");
                setSuccess(0);
                setError({display: 1, header: 'Incorrect Password', message: 'The password for the given username is incorrect'})
            }
        }
        else{
            console.log('This user doesnt exist');
            setSuccess(0);
            setError({display: 1, header: 'Incorrect Username', message: 'The username given does not exist'})
        }
    }

    const classes = useStyles();
    return (
        <div>
           <form className={classes.root} onSubmit={e => checkSignIn(e)}>
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
                    type="password"
                    placeholder="input password"
                    className={classes.textfields}
                />
                <div className={classes.buttonGroup}>
                    <Button type='submit' style={{margin: 30, width: 'fit-content', background: '#aaf0d1'}}>Sign In</Button>
                    <Link to='/register' style={{textDecoration: 'none'}}>
                        <Button style={{margin: 30, width: 'fit-content', background: '#aaf0d1'}}>Register</Button>
                    </Link>
                </div>
                {
                    success ?
                    <Message positive onClick={e => setSuccess(0)} style={{cursor: 'pointer', marginBottom: 20}}>
                        <Message.Header>Successfully Registered</Message.Header>
                        <p>You have successfully reigstered</p>
                    </Message>
                    : <></>
                }
                {
                    error.display ?
                    <Message negative onClick={e => setError({display: 0, header: 0, message: 0})} style={{cursor: 'pointer', marginBottom: 20}}>
                        <Message.Header>{error.header}</Message.Header>
                        <p>{error.message}</p>
                    </Message>
                    : <></>
                }
           </form>
        </div>
    )
}
