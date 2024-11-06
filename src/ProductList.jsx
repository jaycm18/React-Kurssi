import './App.css'
import React, {useState, useEffect} from 'react'
import ProductService from './services/Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'



const ProductList = ({setIsPositive, setShowMessage, setMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen
const [products, setProducts] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaProduct, setMuokattavaProduct] = useState(null)
const [search, setSearch] = useState("")

// useEffect hook ajetaan aina alussa kerran
useEffect(() => {
  ProductService.getAll()
  .then(data => {
    setProducts(data)
})
},[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
)

  //Hakukentän onChange tapahtumankäsittelijä
  const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editProduct = (product) => {
  setMuokattavaProduct(product)
  setMuokkaustila(true)
}

const deleteProduct = (id) => {
    ProductService.remove(id).then(() => {
        setMessage('Product deleted successfully')
        setIsPositive(true)
        setShowMessage(true)
        reloadNow(!reload)
    }).catch(error => {
        setMessage('Error deleting product')
        setIsPositive(false)
        setShowMessage(true)
    })
}

  return (
    <>
        <h1><nobr>Products</nobr>

                {lisäystila && <ProductAdd setLisäystila={setLisäystila}
                setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

                {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

                {!lisäystila && !muokkaustila &&
                <input placeholder="Search" value={search} onChange={handleSearchInputChange} />
                }
                
                {!lisäystila && !muokkaustila &&
                <table id="productTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Supplier</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Order</th>
                            <th>Reorder</th>
                            <th>Discontinued</th>
                        </tr>
                    </thead>
                    <tbody>

                    
                


                {products && products.map(p =>
                {
                    const lowerCaseName = p.productName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={p.productId}>
                                <td>{p.productName}</td>
                                <td>{p.supplierId}</td>
                                <td>{p.categoryId}</td>
                                <td>{p.unitPrice}</td>
                                <td>{p.unitsInStock}</td>
                                <td>{p.unitsOnOrder}</td>
                                <td>{p.reorderLevel}</td>
                                <td>{p.discontinued}</td>
                                <td><button onClick={() => editProduct(p)}>Edit</button></td>
                                <td><button onClick={() => deleteProduct(p.productId)}>Delete</button></td>
                            </tr>                          

                
                                    )
                                }
                            }   
                        )   
                    }

                    </tbody>

                    </table>
                    }
                        {muokkaustila && <ProductEdit // Added ProductEdit component
                        muokattavaProduct={muokattavaProduct}
                        setMuokkaustila={setMuokkaustila}
                        setIsPositive={setIsPositive}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage} />}


                    </>
                )
            }

export default ProductList