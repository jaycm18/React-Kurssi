import './App.css';
import React, { useState } from 'react';
import ProductService from './services/Product';

const ProductAdd = ({ setLisäystila, setIsPositive, setMessage, setShowMessage }) => {

    // Komponentin tilan määritys
    const [newProductName, setNewProductName] = useState('')
    const [newSupplierId, setNewSupplierId] = useState('')
    const [newCategoryId, setNewCategoryId] = useState('')
    const [newUnitPrice, setNewUnitPrice] = useState('')
    const [newUnitsInStock, setNewUnitsInStock] = useState('')
    const [newUnitsOnOrder, setNewUnitsOnOrder] = useState('')
    const [newReorderLevel, setNewReorderLevel] = useState('')
    const [newDiscontinued, setNewDiscontinued] = useState(false)

    // onSubmit tapahtumankäsittelijä funktio
    const handleSubmit = (event) => {
        event.preventDefault();
        var newProduct = {
            productName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            unitPrice: newUnitPrice,
            unitsInStock: newUnitsInStock,
            unitsOnOrder: newUnitsOnOrder,
            reorderLevel: newReorderLevel,
            discontinued: newDiscontinued
        };

        ProductService.create(newProduct)
            .then(response => {
                if (response.status === 200) {
                    setMessage("Added new Product: " + newProduct.productName);
                    setIsPositive(true)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 5000);

                    setLisäystila(false)
                }
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
        <div id="addNew">
            <h2>Product Add</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={newProductName} placeholder="Product Name"
                        onChange={({ target }) => setNewProductName(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newSupplierId} placeholder="Supplier ID"
                        onChange={({ target }) => setNewSupplierId(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newCategoryId} placeholder="Category ID"
                        onChange={({ target }) => setNewCategoryId(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newUnitPrice} placeholder="Unit Price"
                        onChange={({ target }) => setNewUnitPrice(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newUnitsInStock} placeholder="Units In Stock"
                        onChange={({ target }) => setNewUnitsInStock(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newUnitsOnOrder} placeholder="Units On Order"
                        onChange={({ target }) => setNewUnitsOnOrder(target.value)} required />
                </div>
                <div>
                    <input type="text" value={newReorderLevel} placeholder="Reorder Level"
                        onChange={({ target }) => setNewReorderLevel(target.value)} required />
                </div>
                <div>
                    <label>Discontinued</label>
                    <input type="checkbox" checked={newDiscontinued}
                        onChange={({ target }) => setNewDiscontinued(target.checked)} />
                </div>

                <input type='submit' value='Save' />
                <input type='button' value='Back' onClick={() => setLisäystila(false)} />
            </form>
        </div>
    )
}

export default ProductAdd