import React, { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


const useStyles = makeStyles((theme) => ({
    cartContainer: {
        width: '70%',
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
        fontFamily: 'Staatliches',
        width: '50%',
    },
    paper: {
        width: 600,
        display: 'flex',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid lightgray',
        background: '#feffea',
        borderRadius: 0
    },
    productHeader: {
        fontSize: 20,
        margin: 'auto',
        marginLeft: 10,
        fontFamily: 'Rubik',
        fontWeight: 800
    },
    productName: {
        fontSize: 15,
        margin: 'auto',
        marginLeft: 10,
        fontFamily: 'Rubik'
    },
    productQuantity: {
        width: '50%',
        fontFamily: 'Rubik',
    },
    productPrice: {
        width: '50%',
        fontFamily: 'Rubik',
    }
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
        setCart(newCart)
    }, [])
    return (
        <div>
            <Paper className={classes.cartContainer}>
                <Typography className={classes.formTitle}>
                    Order Summary
                </Typography>
                <Paper className={classes.paper}>
                    <Typography className={classes.productHeader}>Item</Typography>
                    <div style={{display: 'flex', width: '40%', justifyContent: 'space-evenly'}}>
                        <Typography className={classes.productHeader} style={{width: '50%'}}>Quantity</Typography>
                        <Typography className={classes.productHeader} style={{width: '50%'}}>Item Total</Typography>
                    </div>
                </Paper>
                    {
                        cart.map((item) => {
                            return(
                                <Paper className={classes.paper}>
                                    <Typography className={classes.productName}>{item.product}</Typography>
                                    <div style={{display: 'flex', width: '40%', justifyContent: 'space-evenly'}}>
                                        <Typography className={classes.productQuantity}>{item.quantity}</Typography>
                                        <Typography className={classes.productTotal}>{formatter.format(item.total)}</Typography>
                                    </div>
                                </Paper>
                            )
                        })
                    }
            </Paper>
        </div>
    )
}
