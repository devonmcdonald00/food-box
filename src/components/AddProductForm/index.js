import React, {useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Switch, FormControlLabel, Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Message } from 'semantic-ui-react'


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
        marginTop: 50,
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

export default function AddProductForm(props) {
    const classes = useStyles();
    const [success, setSuccess] = useState(0)
    const [error, setError] = useState({display: 0, header: "", message: ""})
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [cuisine, setCuisine] = useState("")
    const [description, setDescription] = useState("")
    const [imageurl, setImageUrl] = useState("")


    const addProduct = async (e) => {
        e.preventDefault();
        const addProduct = await fetch('http://localhost:8090/add_product', {
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
            })
        })

        const addProductResponse = await addProduct.json();

        if(addProductResponse){
            setError({display: 0, header: "", message: ""})
            setSuccess(1)
            props.getProduct();
        }
        else{
            setSuccess(0)
            setError({display: 1, header: "Error Adding Product", message: "There was an error adding the product"})
        }
    }


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 70}}>
                <Paper className={classes.paper}>
                    <form className={classes.root} onSubmit={e => addProduct(e)}>
                        <Typography className={classes.formTitle}>Add Product</Typography>
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
                            InputProps={{
                                step: "0.01"
                            }}
                            value={price}
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
                        <Button type='submit' style={{margin: 30, width: 'fit-content', background: '#aaf0d1'}}>Submit</Button>
                        {
                            success ?
                            <Message positive onClick={e => setSuccess(0)} style={{cursor: 'pointer', marginBottom: 20}}>
                                <Message.Header>Successfully Added Product</Message.Header>
                                <p>The product was added successfully</p>
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
        </div>
    )
}
