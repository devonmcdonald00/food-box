import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { set_username, set_admin } from '../../state/userSlice'

export default function FoodboxPage() {

    const location = useLocation();
    const [admin, setAdmin] = useState(0);
    const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username'))['username'])
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('username'))['username'])
        const getAdmin = async () => {
            const admin = await fetch("http://localhost:8090/check_admin", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Encoding" : 'gzip, deflate, br'
                },
                data: JSON.stringify({
                    username: username
                })
            })

            const adminResponse = admin.json();
            dispatch(set_admin(adminResponse))
            dispatch(set_username(adminResponse));
            setAdmin(adminResponse);

        }

        getAdmin();
    }, [])

    return (
        <div>
            <h3 style={{margin: 10}}>Welcome {username}!</h3>
            {
                admin ? 
                <Link to="/admin">
                    <Button style={{marginTop: 50, width: 'fit-content', background: 'gray', position: 'absolute', top: 30, right: 10, color: 'white'}}>Admin Management</Button>
                </Link>
                :
                <></>
            }
        </div>
    )
}
