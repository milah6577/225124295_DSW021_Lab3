import React, {useState, useEffect} from "react"
import "./App.css"

function ProductCatalog() {
  const[products, setProducts] = useState([]);
  const[searchQuery, setSearchQuery] = useState("");
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(false);

 /*useEffect(()=>{
    fetch('https://fakestoreapi.com/products ')  
    .then(response=> response.json)
    .then(jsonData=> setProducts(jsonData))  
  },[]);*/ 

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products ')  
    .then(response=> response.json())
    .then(jsonData=> setProducts(jsonData))
    .catch(()=> setError("Failed to load products.")) 
    .finally(() => setLoading(false))
  },[]);

  const filteredProducts = products.filter((product)=>
product.title.toLowerCase().includes(searchQuery.toLowerCase())
);

   if (loading){
            return(
                <div className="loadCat">
                    <p>Loading...</p>
                </div>
            );
        }
     if(error){
            return(
               <div className="errorCat">
                    <p>Error...</p>
                </div>
            );
        }

return(
    <div className="ProCatalog">
        <h1>Product Catalog</h1>



        <input type="text" 
        placeholder="Search products..." value={searchQuery}
        onChange={(e)=> setSearchQuery(e.target.value)} />

        {filteredProducts.length === 0 ? (
        <p>Product not found...</p>
      ) : (
        <ul className="prodList">
          {filteredProducts.map((product) => (
            <li key={product.id} className="prodCard">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      )}

      
        

    </div>


);
} 

export default ProductCatalog