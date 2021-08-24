import React, { useEffect, useState } from 'react'
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';

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
    productDisplay: {
        display: 'flex',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    paper: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 20
    },
    search: {
        position: 'relative',
        marginTop: 20,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '90%',
        background: 'lightgray',
        opacity: .6,
        borderRadius: 5
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
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

export default function AdminPage() {
    const classes = useStyles();
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetch("http://localhost:8090/get_products", {
                method: "GET",
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
            })
            const productsResponse = await products.json()
            setProducts(productsResponse);
            console.log(products);
        }

        getProducts();

    }, [])

    const productEdit = (product) => {
        console.log(product)
        history.push({pathname: '/product-edit', state: {product: JSON.stringify(product)}})
    }

    return (
        <div>
            <form>

            </form>
            <div className={classes.search} style={{width: '100%'}}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search for product name here..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className={classes.productDisplay}>
                {
                    search.length !== 0 ?
                    products.map((product) => {
                        if(product.name.substring(0, search.length) === search){
                            return (
                                <Paper className={classes.paper}>
                                    <h3>{product.name}</h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Description: {product.description}</p>
                                    <p>Cuisine: {product.cuisine}</p>
                                    <Button id={product.name} style={{marginTop: 5, width: 'fit-content', background: '#aaf0d1'}}>Edit</Button>
                                </Paper>
                            )
                        }
                    })
                    :
                    products.map((product) => {
                        return (
                            <Paper className={classes.paper}>
                                <h3>{product.name}</h3>
                                <p>Price: {product.price}</p>
                                <p style={{textAlign: 'center'}}>Description: {product.description}</p>
                                <p>Cuisine: {product.cuisine}</p>
                                <img src={product.imageurl} style={{height: 50, width: 'fit-content', marginBottom: 10}} alt=''/>
                                <Button id={product.name} onClick={e => productEdit(product)} style={{marginTop: 5, width: 'fit-content', background: '#aaf0d1'}}>Edit</Button>
                            </Paper>
                        )
                    })
                }
            </div>
        </div>
    )
}
