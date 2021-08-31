import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Message } from 'semantic-ui-react'
import { Button, Switch, FormControlLabel, Paper, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
      margin: {
        margin: theme.spacing(1),
      },
      textfields: {
          margin: 8,
          width: 300
      },
      paper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 100,
        width: 600,
        padding: 50
    },
    formTitle: {
        fontSize: 25,
        color: '#013220',
        paddingTop: 20,
        paddingBottom: 5
    },
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

export default function ProductEditPage() {
    const [name, setName] = useState(useSelector((state) => state.productEdit.name))
    const [price, setPrice] = useState(useSelector((state) => state.productEdit.price))
    const [cuisine, setCuisine] = useState(useSelector((state) => state.productEdit.cuisine))
    const [enabled, setEnabled] = useState(useSelector((state) => state.productEdit.enabled))
    const [description, setDescription] = useState(useSelector((state) => state.productEdit.description))
    const [imageurl, setImageUrl] = useState(useSelector((state) => state.productEdit.imageurl))
    const [success, setSuccess] = useState(0)
    const [error, setError] = useState({display: 0, header: "", message: ""})
    const dispatch = useDispatch()
    const history = useHistory();
    const classes = useStyles();

    const submitEdit = async (e) => {
        console.log(enabled)
        e.preventDefault();
        console.log(e)
        const editProduct = await fetch('https://sheltered-escarpment-17399.herokuapp.com/change_product', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "cuisine": cuisine,
                "imageurl": imageurl,
                "price": price.toString(),
                "enabled": enabled ? "true" : "false"
            })
        })

        const editProductResponse = await editProduct.json();

        if(editProductResponse){
            setError({display: 0, header: "", message: ""})
            setSuccess(1);
        }
        else{
            setSuccess(0);
            setError({display: 1, header: 'Edit Error', message: 'There was an error editing this product'})
        }
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.paper}>
                <form className={classes.root} onSubmit={e => submitEdit(e)}>
                    <Typography className={classes.formTitle}>Edit Product</Typography>
                    <StyledTextField
                        required
                        id="name"
                        label="Product name"
                        placeholder="product new name"
                        className={classes.textfields}
                        value={name}
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    <StyledTextField
                        required
                        id="price"
                        label="Price"
                        placeholder="product new price"
                        className={classes.textfields}
                        type="number"
                        value={price}
                        step="0.01"
                        onChange={(e) => {setPrice(e.target.value)}}
                    />
                    <StyledTextField
                        required
                        id="description"
                        label="Description"
                        placeholder="product new description"
                        className={classes.textfields}
                        value={description}
                        onChange={(e) => {setDescription(e.target.value)}}
                    />
                    <StyledTextField
                        required
                        id="cuisine"
                        label="Cuisine"
                        placeholder="product new cuisine"
                        className={classes.textfields}
                        value={cuisine}
                        onChange={(e) => {setCuisine(e.target.value)}}
                    />
                    <StyledTextField
                        required
                        id="imageurl"
                        label="Image URL"
                        placeholder="new image URL"
                        className={classes.textfields}
                        value={imageurl}
                        onChange={(e) => {setImageUrl(e.target.value)}}
                    />
                    <FormControlLabel
                        control={
                            <GreenSwitch
                                id="enabled"
                                label="Enabled"
                                checked={enabled}
                                onChange={() => {setEnabled(!enabled)}}
                            />
                        }
                        label="Enabled"
                        style={{margin: 10}}
                    />
                    <div style={{display: 'flex', margin: 30, justifyContent: 'space-evenly', width: 300}}>
                        <Button type='submit' style={{width: 'fit-content', background: '#aaf0d1'}}>Submit</Button>
                        <Link to='/admin'>
                            <Button style={{width: 'fit-content', background: '#aaf0d1'}}>Go Back</Button>
                        </Link>
                    </div>
                    {
                        success ?
                        <Message positive onClick={e => setSuccess(0)} style={{cursor: 'pointer', marginBottom: 20}}>
                            <Message.Header>Successfully Edited Product</Message.Header>
                            <p>The product was edited successfully</p>
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
            </Paper>
        </div>
    )
}
