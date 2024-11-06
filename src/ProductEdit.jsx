import './App.css'
import React, { useState } from 'react'
import ProductService from './services/Product'

const ProductEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattavaProduct }) => {
    const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
    const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice)
    const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
    const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
    const [newDiscontinued, setNewDiscontinued] = useState(muokattavaProduct.discontinued)

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedProduct = {
            productId: muokattavaProduct.productId, // Ensure the productId is included
            productName: newProductName,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued
        };

        ProductService.update(updatedProduct.productId, updatedProduct)
            .then(response => {
                setMessage("Edited Product: " + updatedProduct.productName)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 5000);

                setMuokkaustila(false)
            })
            .catch(error => {
                setMessage(error.message)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)
            })
    }

    return (
        <div id="edit">
            <h2>Product Edit</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name</label>
                </div>
                <div>
                    <input type="text" value={newProductName} placeholder="Product Name"
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <label>Unit Price</label>
                </div>
                <div>
                    <input type="text" value={newUnitPrice} placeholder="Unit Price"
                        onChange={({ target }) => setNewUnitPrice(target.value)} required />
                </div>
                <div>
                    <label>Units In Stock</label>
                </div>
                <div>
                    <input type="text" value={newUnitsInStock} placeholder="Units In Stock"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} required />
                </div>
                <div>
                    <label>Units On Order</label>
                </div>
                <div>
                    <input type="text" value={newUnitsOnOrder} placeholder="Units On Order"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} required />
                </div>
                <div>
                    <label>Reorder Level</label>
                </div>
                <div>
                    <input type="text" value={newReorderLevel} placeholder="Reorder Level"
                        onChange={({ target }) => setNewReorderLevel(target.value)} required />
                </div>
                <div>
                    <label>Discontinued</label>
                </div>
                <div>
                    <input type="checkbox" checked={newDiscontinued}
                        onChange={({ target }) => setNewDiscontinued(target.checked)} />
                </div>

                <input type='submit' value='Save' />
                <input type='button' value='Back' onClick={() => setMuokkaustila(false)} />
            </form>
        </div>
    )
}

export default ProductEdit