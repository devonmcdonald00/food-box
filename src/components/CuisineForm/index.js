import { Paper, Typography, FormControlLabel, Switch, TextField, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cuisineContainer: {
        width: '90%',
        height: 'fit-content',
        marginBottom: 60,
    },
    cuisineTitle: {
        fontSize: 25,
        color: '#013220',
        paddingTop: 30,
        paddingBottom: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
}))

const GreenSwitch = withStyles({
    switchBase: {
      color: '#18A558',
      '&$checked': {
        color: '#18A558',
      },
      '&$checked + $track': {
        backgroundColor: '#18A558',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const CuisineControlLabel = withStyles({
    label: {
        marginRight: 15,
        alignSelf: 'flex-end'
    }
  })(FormControlLabel);

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

export default function CuisineForm(props) {
    const classes = useStyles();
    const [cuisines, setCuisines] = useState(props.cuisines)
    const [newCuisine, setNewCuisine] = useState("");
    const [newCuisineImageURL, setNewCuisineImageURL] = useState("");

    useEffect(() => {
        setCuisines(props.cuisines)
    }, [props])

    const changeCuisine = async (cuisine, enabled) => {

        const changeCuisine = await fetch('https://sheltered-escarpment-17399.herokuapp.com/change_cuisine', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                "cuisine": cuisine,
                "enabled": enabled
            })
        })

        const changeCuisineResponse = await changeCuisine.json();
        if(changeCuisineResponse){
            console.log("success")
            props.getCuisines();
            props.getProducts();
        }
        else{
            console.log("error")
        }
    }

    const addCuisine = async () => {
        const addCuisine = await fetch('https://sheltered-escarpment-17399.herokuapp.com/add_cuisine', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                "cuisine": newCuisine,
                "enabled": "true",
                "flag_image_url": newCuisineImageURL
            })
        })

        const addCuisineResponse = await addCuisine.json();

        if(addCuisineResponse){
            console.log("success")
            props.getCuisines();
        }
        else{
            console.log("error")
        }
    }

    const deleteCuisine = async (cuisine) => {
        const deleteCuisine = await fetch('https://sheltered-escarpment-17399.herokuapp.com/delete_cuisine', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                "cuisine": cuisine.cuisine,
            })
        })

        const deleteCuisineResponse = await deleteCuisine.json();

        if(deleteCuisineResponse){
            console.log("success")
            props.getCuisines();
        }
        else{
            console.log("error")
        }
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.cuisineContainer}>
                <Typography className={classes.cuisineTitle}>Cuisine Control Panel</Typography>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
                    <CuisineControlLabel
                        control={
                            <StyledTextField
                                id="cuisine_name"
                                label="Cuisine name"
                                placeholder="New cuisine name"
                                className={classes.textfields}
                                value={newCuisine}
                                onChange={(e) => setNewCuisine(e.target.value)}
                            />
                        }
                        label="Add Cuisine: "
                        labelPlacement="start"
                        className={classes.cuisineControlLabel}
                    />
                    <CuisineControlLabel
                        control={
                            <StyledTextField
                                id="cuisine_image"
                                label="Cuisine image URL"
                                placeholder="New cuisine image URL"
                                className={classes.textfields}
                                value={newCuisineImageURL}
                                onChange={(e) => setNewCuisineImageURL(e.target.value)}
                            />
                        }
                        label="Cuisine URL: "
                        labelPlacement="start"
                        className={classes.cuisineControlLabel}
                        style={{marginLeft: 30}}
                    />
                    <Button style={{marginLeft: 30, width: 'fit-content', background: '#aaf0d1', height: 30, alignSelf: 'center'}} onClick={() => addCuisine()}>Add</Button>
                </div>
                <div style={{display: 'flex', justifyContent: cuisines.length > 4 ? 'space-between' : 'space-evenly', padding: 30}}>
                    {
                        cuisines.length !== 0 ? 
                        cuisines.map((cuisine) => {
                           return(
                               <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                   <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <h4 style={{textAlign: 'center', margin: 'auto', marginRight: 10}}>{cuisine.cuisine}</h4>
                                        <img src={cuisine.flagImageURL} style={{height: 30, width: 'fit-content', borderRadius: '50%'}}/>
                                   </div>
                                   <FormControlLabel
                                        control={
                                            <GreenSwitch
                                                id="enabled"
                                                label="Enabled"
                                                checked={cuisine.enabled}
                                                onChange={() => changeCuisine(cuisine.cuisine, !cuisine.enabled)}
                                            />
                                        }
                                        label="Enabled"
                                        style={{margin: 10}}
                                    />
                                    <Button onClick={() => deleteCuisine(cuisine)} style={{margin: 'auto', marginTop: 10, width: 'fit-content', background: '#aaf0d1'}}>Delete</Button>
                               </div>
                           )
                        })
                        :
                        <></>
                    }
                </div>
            </Paper>
        </div>
    )
}
