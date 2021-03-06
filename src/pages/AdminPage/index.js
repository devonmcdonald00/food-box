import React, { useEffect, useState } from 'react'
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { change_name, change_cuisine, change_description, change_imageurl, change_price, change_enable } from '../../state/productEditSlice'
import AddProductForm from '../../components/AddProductForm';
import CuisineForm from '../../components/CuisineForm';

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
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    paper: {
        width: 350,
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
        display: 'flex',
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
        width: '100%',
        background: 'lightgray',
        opacity: .6,
        borderRadius: 5,
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
      },
      editProductContainer: {
        width: '90%',
        padding: 20,
        margin: 'auto',
      },
      formTitle: {
        fontSize: 25,
        color: '#013220',
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: 'center'
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
    const dispatch = useDispatch()
    const [cuisines, setCuisines] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetch("https://sheltered-escarpment-17399.herokuapp.com/get_products", {
                method: "GET",
                mode: 'cors',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip, deflate, br',
                },
            })
            const productsResponse = await products.json()
            setProducts(productsResponse);
        }

        const getCuisines = async () => {
          const cuisines = await fetch('https://sheltered-escarpment-17399.herokuapp.com/get_cuisines', {
              method: 'GET',
              mode: 'cors',
          })
          
          const cuisinesResponse = await cuisines.json();
          setCuisines(cuisinesResponse)
      }

        getProducts();
        getCuisines();

    }, [])

    const getProducts = async () => {
      const products = await fetch("https://sheltered-escarpment-17399.herokuapp.com/get_products", {
          method: "GET",
          mode: 'cors',
          headers : {
              'Content-Type': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
          },
      })
      const productsResponse = await products.json()
      setProducts(productsResponse);
    }

    const getCuisines = async () => {
      const cuisines = await fetch('https://sheltered-escarpment-17399.herokuapp.com/get_cuisines', {
          method: 'GET',
          mode: 'cors',
      })
      
      const cuisinesResponse = await cuisines.json();
      console.log('here')
      setCuisines(cuisinesResponse)
  }

    const productEdit = (product) => {
        dispatch(change_name(product.name))
        dispatch(change_cuisine(product.cuisine))
        dispatch(change_description(product.description))
        dispatch(change_price(product.price))
        dispatch(change_imageurl(product.imageurl))
        dispatch(change_enable(product.enabled))
        history.push('/product-edit')
    }

    const productDelete = async (product) => {
      const deleteProduct = await fetch('https://sheltered-escarpment-17399.herokuapp.com/delete_product', {
        method: 'POST',
        mode: 'cors',
        headers : {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
        },
        body: JSON.stringify({
          "name": product.name
        })
      })

      const deleteProductResponse = await deleteProduct.json();

      if(deleteProductResponse){
        console.log("success")
        getProducts();
      }
      else{
        console.log("error")
      }
    }

    return (
        <div>
            <AddProductForm getProducts={() => getProducts()} cuisines={cuisines}/>
            <CuisineForm getProducts={() => getProducts()} getCuisines={() => getCuisines()} cuisines={cuisines}/>
            <Paper className={classes.editProductContainer}>
              <Typography className={classes.formTitle}>Edit Product</Typography>
              <div className={classes.search} style={{width: '100%', display: 'flex'}}>
                <div style={{margin: 'auto', width: '80%'}}>
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
                  
              </div>
              <div className={classes.productDisplay}>
                {
                    search.length !== 0 ?
                    <Grid item spacing={10}>
                      <Grid container justify="center" spacing={10} style={{marginTop: 20, marginBottom: 20}}>
                        {products.map((product, i) => {
                            if(product.name.substring(0, search.length) === search){
                                return (
                                    <Grid key={i} item>
                                      <Paper className={classes.paper}>
                                          <h3>{product.name}</h3>
                                          <p>Price: {"$" + product.price.toString()}</p>
                                          <p>Description: {product.description}</p>
                                          <p>Cuisine: {product.cuisine}</p>
                                          <p>Enabled: {product.enabled.toString()}</p>
                                          <img src={product.imageurl} style={{height: 50, width: 'fit-content', marginBottom: 10}} alt=''/>
                                          <Button id={product.name} onClick={e => productEdit(product)} style={{marginTop: 5, width: 'fit-content', background: '#aaf0d1'}}>Edit</Button>
                                      </Paper>
                                    </Grid>
                                )
                            }
                        })}
                      </Grid>
                    </Grid>
                    :
                    <Grid item spacing={10}>
                      <Grid container justify="center" spacing={10} style={{marginTop: 20, marginBottom: 20}}>
                        {products.map((product, i) => {
                            return (
                              <Grid key={i} item>
                                <Paper className={classes.paper}>
                                    <h3>{product.name}</h3>
                                    <p>Price: {"$" + product.price.toString()}</p>
                                    <p style={{textAlign: 'center'}}>Description: {product.description}</p>
                                    <p>Cuisine: {product.cuisine}</p>
                                    <p>Enabled: {product.enabled.toString()}</p>
                                    <img src={product.imageurl} style={{height: 50, width: 'fit-content', marginBottom: 20}} alt=''/>
                                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: 200}}>
                                      <Button id={product.name} onClick={e => productEdit(product)} style={{marginTop: 5, width: 'fit-content', background: '#aaf0d1'}}>Edit</Button>
                                      <Button id={product.name} onClick={e => productDelete(product)} style={{marginTop: 5, width: 'fit-content', background: '#aaf0d1'}}>Delete</Button>
                                    </div>
                                </Paper>
                              </Grid>
                            )
                        })}
                      </Grid>
                    </Grid>
                }
            </div>
          </Paper>
          <div style={{height: 40}}></div>
        </div>
    )
}
