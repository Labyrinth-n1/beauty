import { useState, useEffect } from 'react';
import './App.css';

// Interface pour les props des produits
interface ProductProps {
    title: string;
    price: number;
    link: string;
    image: string;
}

// Composant ProductCard
const ProductCard: React.FC<ProductProps> = ({ title, price, link, image }) => {
  return (
    <div
      className="product-card"
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
        width: '250px',
        margin: '15px',
        backgroundColor: '#fff',
        transition: 'transform 0.3s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        style={{
          height: '150px',
          width: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '10px',
        }}
        src={image}
        alt={title}
      />
      <h2 style={{ fontSize: '18px', margin: '10px 0' }}>{title}</h2>
      <p style={{ color: '#555', margin: '5px 0' }}>Prix : {price} €</p>
      <a
        href={link}
        style={{
          color: '#007BFF',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Voir le produit
      </a>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Erreur de récupération des produits:', error));
  }, []);

  return (
    <div className="product-page" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Produits disponibles</h1>
      <div
        className="products-list"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {products.length === 0 ? (
          <p>Chargement des produits...</p>
        ) : (
          products.map((product, index) => (
            <ProductCard
              key={index}
              title={product['Nom du produit']}
              price={product['Prix']}
              link={product['Lien']}
              image={product['Image']}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

