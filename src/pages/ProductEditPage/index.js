import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


export default function ProductEditPage() {
    const history = useHistory();
    const [product, setProduct] = useState({});

    useEffect(() => {
        console.log(history.state)
        //setProduct(JSON.parse(history.state.product))
    }, [])
    return (
        <div>
            <h1>Product Edit page</h1>
            {
                product.name &&
                <h1>Editing {product.name}</h1>
            }
        </div>
    )
}
