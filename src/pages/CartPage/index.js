import React, { useState, useEffect } from 'react'
import { Paper, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';



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
        alignItems: 'center',
        paddingBottom: 80
    },
    paymentContainer: {
        width: '70%',
        padding: 20,
        margin: 'auto',
        marginTop: 50,
        minWidth: 670,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30
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
        fontFamily: 'Rubik',
        padding: 10
    },
    productQuantity: {
        fontFamily: 'Rubik',
    },
    productTotal: {
        fontFamily: 'Rubik',
        position: 'absolute',
        right: 50,
        top: -10
    }
}));

const stripePromise = loadStripe('pk_test_51HeXZCBHhe5b3zt2oVYEtSM8hHm6wnEhfjDVNdxiGOYQejWYs3UK3ZAYpNdZRQFZ50Fmp6pfyfOQJgyDxyal9Ts000FivUv3Re')

export default function CartPage({ setCartCounter }) {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const history = useHistory();


    useEffect(() => {
        let newCart = []
        let newTotal = 0;
        for (let key in JSON.parse(localStorage.getItem('cart'))){
            let newItem = {
                'product': key,
                'quantity': JSON.parse(localStorage.getItem('cart'))[key]['quantity'],
                'total': JSON.parse(localStorage.getItem('cart'))[key]['productTotal']
            }
            newCart.push(newItem)
            newTotal += JSON.parse(localStorage.getItem('cart'))[key]['productTotal']
        }
        console.log(newCart)
        setCart(newCart)
        setTotal(newTotal);
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
                        <Typography className={classes.productHeader} style={{width: '50%', marginLeft: 0}}>Quantity</Typography>
                        <Typography className={classes.productHeader} style={{width: '50%'}}>Item Total</Typography>
                    </div>
                </Paper>
                    {
                        cart.map((item) => {
                            return(
                                <Paper className={classes.paper}>
                                    <Typography className={classes.productName}>{item.product}</Typography>
                                    <div style={{display: 'flex', width: '40%', justifyContent: 'space-evenly', position: 'relative'}}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', left: 40, position: 'absolute', top: -10}}>
                                            <Typography className={classes.productQuantity}>{item.quantity}</Typography>
                                        </div>
                                        <Typography className={classes.productTotal}>{formatter.format(item.total)}</Typography>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                    <Paper style={{marginTop: 20, display: 'flex'}}>
                        <Typography className={classes.productHeader} >Total: {formatter.format(total)}</Typography>
                        <Button onClick={() => {localStorage.removeItem('cart'); history.push('/food-box-home'); setCartCounter(0)}} style={{width: 'fit-content', background: '#aaf0d1', marginLeft: 20}}>Clear Cart</Button>
                        <Button onClick={() => {history.push('/food-box-home')}} style={{width: 'fit-content', background: '#aaf0d1', marginLeft: 20}}>Add</Button>
                    </Paper>
            </Paper>
            <Paper className={classes.paymentContainer}>
                <Typography className={classes.formTitle} style={{paddingTop: 0, margin: 'auto'}}>
                    Payment Submission
                </Typography>
                <div style={{width: 400, margin: 'auto'}}>
                    <Elements stripe={stripePromise}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        color: "black",
                                        fontWeight: 500,
                                        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                                        fontSize: "16px",
                                        fontSmoothing: "antialiased",
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                        ":-webkit-autofill": {
                                            color: "#fce883"
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </Elements>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <Button style={{width: 'fit-content', background: '#aaf0d1', margin: 'auto'}}>
                        Submit Order
                    </Button>
                </div>
            </Paper>
            <div style={{height: 40}}></div>
        </div>
    )
}
