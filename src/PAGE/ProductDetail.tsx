import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
        
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);
  

  return (
    <div className="col">
      {product ? (
        <div className="list2">
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.dipscription}</p>
          <img src={product.image} alt={product.name} width={300} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
