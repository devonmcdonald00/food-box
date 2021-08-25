import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { set_username, set_admin } from '../../state/userSlice'
import { LocalGasStationRounded } from '@material-ui/icons'
import { Button, Grid, InputBase, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
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
      productContainer: {
        width: '90%',
        padding: 20,
        margin: 'auto',
        marginTop: 70
      },
      formTitle: {
        fontSize: 30,
        color: '#013220',
        paddingTop: 50,
        paddingBottom: 5,
        textAlign: 'center',
        fontFamily: 'Staatliches'
    },
  }));

export default function FoodboxPage() {
    const history = useHistory();
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin'))['admin']);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('user'))['username'].toString())
    const dispatch = useDispatch();
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState([]);
    const [cuisines, setCuisines] = useState([])
    const [flagMapping, setFlagMapping] = useState({})


    useEffect(() => {
        const getAdmin = async () => {
            console.log(username)
            const admin = await fetch("http://localhost:8090/check_admin", {
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
        }

        const getCuisines = async () => {
            const cuisines = await fetch('http://localhost:8090/get_cuisines', {
                method: 'GET',
                mode: 'cors',
            })
            
            const cuisinesResponse = await cuisines.json();
            setCuisines(cuisinesResponse)
            console.log(cuisinesResponse)
            let flagMapping = {}
            cuisinesResponse.map(cuisine => {
                flagMapping[cuisine.cuisine] = cuisine.flagImageURL
            })

            console.log(flagMapping)
            setFlagMapping(flagMapping);
        }

        getProducts();
        getCuisines();
    }, [])

    return (
        <div>
            {
                admin ?
                    <Link to="/admin">
                        <Button style={{ marginTop: 50, width: 'fit-content', background: 'gray', position: 'absolute', top: 30, right: 10, color: 'white' }}>Admin Management</Button>
                    </Link>
                    :
                    <></>
            }
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
                    <div className={classes.productDisplay}>
                        {
                            search.length !== 0 ?
                                <Grid item spacing={10}>
                                    <Grid container justify="center" spacing={10} style={{ marginTop: 20, marginBottom: 20 }}>
                                        {products.map((product, i) => {
                                            if (product.name.substring(0, search.length) === search) {
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
                                                            <img src={product.imageurl} style={{ height: 300, width: 'fit-content', marginBottom: 20, borderRadius: 5 }} alt='' />
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
                                                        <img src={product.imageurl} style={{ height: 300, width: 'fit-content', marginBottom: 20, borderRadius: 5 }} alt='' />
                                                        <Button id={product.name} style={{marginTop: 5, marginBottom: 10, width: 'fit-content', background: '#aaf0d1', padding: 10}}>add to Cart <ShoppingCartIcon/></Button>
                                                    </Paper>
                                                </Grid>
                                            )
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
