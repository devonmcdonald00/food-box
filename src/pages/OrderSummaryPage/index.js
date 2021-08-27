import React, { useState, useEffect } from 'react'
import { Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


const useStyles = makeStyles((theme) => ({
    orderContainer: {
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
    title: {
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
        flexDirection: 'column',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid lightgray',
        background: '#feffea',
        borderRadius: 0
    },
    orderText: {
        fontSize: 15,
        color: '#013220',
        padding: 10,
        paddingBottom: 5,
        textAlign: 'center',
        margin: 'auto',
    },
    receiptLink: {
        textDecoration: 'none'
    }
}));

export default function OrderSummaryPage() {
    const classes = useStyles();
    const history = useHistory();
    const [order, setOrder] = useState(JSON.parse(localStorage.getItem('order')))

    useEffect(() => {
        if(localStorage.getItem('order') === null){
            history.pushState('/food-box-home')
        }
    }, [])

    return (
        <div>
            <Paper className={classes.orderContainer}>
            
                <Typography className={classes.title}>
                    Order Summary
                </Typography>
                <Paper className={classes.paper}>
                    <p className={classes.orderText}>Order Id:  {order.id}</p>
                    <p className={classes.orderText}>Total:   {formatter.format(order.amount/100)}</p>
                    <p className={classes.orderText}>Thank you for shopping with Foodbox Delivery!</p>
                    <Button style={{width: 'fit-content', background: '#aaf0d1', margin: 20}}>
                        <a href={order.receipt_url} className={classes.receiptLink}>
                            See Full Receipt
                        </a>
                    </Button>
                </Paper>
            </Paper>
        </div>
    )
}
