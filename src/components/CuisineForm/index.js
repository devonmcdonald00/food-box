import { Paper, Typography, FormControlLabel, Switch } from '@material-ui/core'
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
    }
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

export default function CuisineForm() {
    const classes = useStyles();
    const [cuisines, setCuisines] = useState([])

    useEffect(() => {
        const getCuisines = async () => {
            const cuisines = await fetch('http://localhost:8090/get_cuisines', {
                method: 'GET',
                mode: 'cors',
            })
            
            const cuisinesResponse = await cuisines.json();
            setCuisines(cuisinesResponse)
        }

        getCuisines();
    }, [])

    const changeCuisine = async (cuisine, enabled) => {
        console.log(cuisine)
        console.log(enabled)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.cuisineContainer}>
                <Typography className={classes.cuisineTitle}>Cuisine Control Panel</Typography>
                <div style={{display: 'flex', justifyContent: 'space-evenly', padding: 15}}>
                    {
                        cuisines.length !== 0 ? 
                        cuisines.map((cuisine) => {
                           return(
                               <div>
                                   <h4 style={{textAlign: 'center'}}>{cuisine.cuisine}</h4>
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
