import React, { useState, useEffect } from 'react';



const ProductPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Appel à l'API Flask pour récupérer les produits
    fetch('http://localhost:5000/products')  // URL de ton API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erreur de récupération des produits:', error));
  }, []);

  return (
    <div className="product-page">
      <h1>Liste des Produits</h1>
      <div className="products-list">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product['Nom du produit']}
            price={product['Prix']}
            link={product['Lien']}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
