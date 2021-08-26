import React, { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    cartContainer: {
        width: '90%',
        padding: 20,
        margin: 'auto',
        marginTop: 50,
        minWidth: 670,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formTitle: {
        fontSize: 30,
        color: '#013220',
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Staatliches'
    },
    paper: {
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'center',
        border: '2px solid lightgray',
        background: '#feffea'
    },
}));
export default function CartPage() {
    const classes = useStyles();
    const [cart, setCart] = useState([])

    useEffect(() => {
        let newCart = []
        for (let key in JSON.parse(localStorage.getItem('cart'))){
            let newItem = {
                'product': key,
                'quantity': JSON.parse(localStorage.getItem('cart'))[key]['quantity'],
                'total': JSON.parse(localStorage.getItem('cart'))[key]['productTotal']
            }
            newCart.push(newItem)
        }
        console.log(newCart)
    }, [])
    return (
        <div>
            <Paper className={classes.cartContainer}>
                <Typography className={classes.formTitle}>
                    Order Summary
                </Typography>
                <Paper className={classes.paper}>
                    {<h1>Hello</h1>}
                </Paper>
            </Paper>
        </div>
    )
}
