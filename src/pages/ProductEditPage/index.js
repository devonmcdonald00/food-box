import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

export default function ProductEditPage() {
    const [name, setName] = useState(useSelector((state) => state.productEdit.name))
    const [price, setPrice] = useState(useSelector((state) => state.productEdit.price))
    const [cuisine, setCuisine] = useState(useSelector((state) => state.productEdit.cuisine))
    const [enabled, setEnabled] = useState(useSelector((state) => state.productEdit.enabled))
    const [description, setDescription] = useState(useSelector((state) => state.productEdit.description))
    const [imageurl, setImageUrl] = useState(useSelector((state) => state.productEdit.imageurl))

    const dispatch = useDispatch()

    useEffect(() => {
        //setProduct(JSON.parse(history.state.product))
    }, [])
    return (
        <div>
            <h1>Product Edit page</h1>
            {
                <div>
                    <h1>{name}</h1>
                    <p>{price}</p>
                </div>
            }
        </div>
    )
}
