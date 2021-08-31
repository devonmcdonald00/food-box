import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, InputBase, Paper, Typography, Chip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

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
        width: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignText: 'center',
        justifyContent: 'center',
        margin: 20,
        padding: 20,
        border: '2px solid lightgray',
        background: '#feffea'
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
      productContainer: {
        width: '90%',
        padding: 20,
        margin: 'auto',
        marginTop: 70,
        minWidth: 660,
      },
      formTitle: {
        fontSize: 30,
        color: '#013220',
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Staatliches'
    },
    cuisineChips: {
        display: 'flex',
        width: '80%',
        justifyContent: 'space-evenly',
        marginTop: 30,
        margin: 'auto',
    },
    cuisineChip: {
        '&:hover': {
            opacity: .8
        }
    }
  }));

export default function FoodboxPage({cartCounter, setCartCounter}) {
    const history = useHistory();
    const [admin, setAdmin] = useState(localStorage.getItem('admin') !== null ? JSON.parse(localStorage.getItem('admin'))['admin'] : false);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user'))['username'].toString())
    const dispatch = useDispatch();
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);
    const [cuisines, setCuisines] = useState([])
    const [flagMapping, setFlagMapping] = useState({})
    const [cuisineFilters, setCuisineFilters] = useState({})
    const [trigger, setTrigger] = useState(0)
    const [cart, setCart] = useState({})

    useEffect(() => {
        const getAdmin = async () => {
            console.log(username)
            const admin = await fetch("https://sheltered-escarpment-17399.herokuapp.com/check_admin", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Encoding": 'gzip, deflate, br'
                },
                body: JSON.stringify({
                    username: username
                })
            })

            const adminResponse = await admin.json();
            localStorage.setItem('admin', JSON.stringify({ admin: adminResponse }))
            setAdmin(adminResponse);

        }

        if (username === null || JSON.parse(localStorage.getItem('user'))['signedIn'] !== true) {
            history.push('/')
        }
        else if (localStorage.getItem('admin') === null) {
            getAdmin();
        }


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
            let flagMapping = {}
            let cuisineFilters = {}
            cuisinesResponse.map(cuisine => {
                flagMapping[cuisine.cuisine] = cuisine.flagImageURL;
                cuisineFilters[cuisine.cuisine] = true;

            })

            setFlagMapping(flagMapping);
            setCuisineFilters(cuisineFilters);
        }

        getProducts();
        getCuisines();

    }, [])

    const changeFilter = (cuisine) => {
        let newCuisineFilters = cuisineFilters;
        newCuisineFilters[cuisine] = !cuisineFilters[cuisine]
        setCuisineFilters(newCuisineFilters)
        setTrigger(!trigger)
    }

    const addToCart = (product) => {
        
        if(cart[product.name]){
            let newCart = cart;
            let newProduct = {
                'quantity': cart[product.name]['quantity'] + 1,
                'productTotal': cart[product.name]['productTotal'] + product.price
            }
            newCart[product.name] = newProduct
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(cart))
            setCartCounter(cartCounter+1)
        }
        else{
            let newCart = cart;
            let newProduct = {
                'quantity': 1,
                'productTotal': product.price
            }
            newCart[product.name] = newProduct;
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(cart))
            setCartCounter(cartCounter+1)
        }
        console.log(cart)
    }


    return (
        <div>
            <div>
                <Paper className={classes.productContainer}>
                    <Typography className={classes.formTitle}>Food Item Selection</Typography>
                    <div className={classes.search} style={{ width: '100%', display: 'flex' }}>
                        <div style={{ margin: 'auto', width: '80%' }}>
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
                    <div className={classes.cuisineChips}>
                        {
                            cuisines.map((cuisine) => {
                                return(
                                    <div>
                                        <Chip
                                            label={cuisine.cuisine}
                                            clickable
                                            className={classes.cuisineChip}
                                            style={{fontSize: 13, fontFamily: 'Balsamiq Sans', background: cuisineFilters[cuisine.cuisine] ? '#aaf0d1' : 'gray', color: cuisineFilters[cuisine.cuisine] ? 'black' : 'white'}}
                                            onClick={(e) => changeFilter(cuisine.cuisine)}
                                            disabled={!cuisine.enabled}
                                        >
                                            {cuisine.cuisine}
                                        </Chip>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className={classes.productDisplay}>
                        {
                            search.length !== 0 ?
                                <Grid item spacing={10}>
                                    <Grid container justify="center" spacing={10} style={{ marginTop: 20, marginBottom: 20 }}>
                                        {products.map((product, i) => {
                                            if (product.enabled && cuisineFilters[product.cuisine] && product.name.substring(0, search.length).toLowerCase() === search.toLowerCase()) {
                                                return (
                                                    <Grid key={i} item>
                                                        <Paper className={classes.paper}>
                                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
                                                                <h3 style={{fontFamily: 'Staatliches', fontSize: 30, margin: 'auto'}}>{product.name}</h3>
                                                                <p style={{fontFamily: 'Staatliches', fontSize: 20, alignText: 'center', marginLeft: 10}}>{"$" + product.price.toString()}</p>
                                                            </div>
                                                            <p style={{fontSize: 19, fontWeight: 200}}>{product.description}</p>
                                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                                                <p style={{fontSize: 19, fontWeight: 200, margin: 'auto', marginRight: 12}}>{product.cuisine + " Cuisine"}</p>
                                                                <img src={flagMapping[product.cuisine]} style={{height: 30, width: 'fit-content', borderRadius: '50%'}}/>
                                                            </div>
                                                            <img src={product.imageurl} style={{ height: 250, width: 'fit-content', marginBottom: 20, borderRadius: 5 }} alt='' />
                                                            <Button id={product.name} style={{marginTop: 5, marginBottom: 10, width: 'fit-content', background: '#aaf0d1', padding: 10}} onClick={() => addToCart(product)}>add to Cart <ShoppingCartIcon style={{marginLeft: 5}}/></Button>
                                                        </Paper>
                                                    </Grid>
                                                )
                                            }
                                        })}
                                    </Grid>
                                </Grid>
                                :
                                <Grid item spacing={10}>
                                    <Grid container justify="center" spacing={10} style={{ marginTop: 20, marginBottom: 20 }}>
                                        {products.map((product, i) => {
                                            if(product.enabled && cuisineFilters[product.cuisine]){
                                                return (
                                                    <Grid key={i} item>
                                                        <Paper className={classes.paper}>
                                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 15}}>
                                                                <h3 style={{fontFamily: 'Staatliches', fontSize: 30, margin: 'auto'}}>{product.name}</h3>
                                                                <p style={{fontFamily: 'Staatliches', fontSize: 20, alignText: 'center', marginLeft: 10}}>{"$" + product.price.toString()}</p>
                                                            </div>
                                                            <p style={{fontSize: 19, fontWeight: 200}}>{product.description}</p>
                                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                                                <p style={{fontSize: 19, fontWeight: 200, margin: 'auto', marginRight: 12}}>{product.cuisine + " Cuisine"}</p>
                                                                <img src={flagMapping[product.cuisine]} style={{height: 30, width: 'fit-content', borderRadius: '50%'}}/>
                                                            </div>
                                                            <img src={product.imageurl} style={{ height: 250, width: 'fit-content', marginBottom: 20, borderRadius: 5 }} alt='' />
                                                            <Button id={product.name} style={{marginTop: 5, marginBottom: 10, width: 'fit-content', background: '#aaf0d1', padding: 10}} onClick={() => addToCart(product)}>add to Cart <ShoppingCartIcon style={{marginLeft: 5}}/></Button>
                                                        </Paper>
                                                    </Grid>
                                                )
                                            }
                                        })}
                                    </Grid>
                                </Grid>
                        }
                    </div>
                </Paper>
                <div style={{ height: 40 }}></div>
            </div>
        </div>
    )
}
