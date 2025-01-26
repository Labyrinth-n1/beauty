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
        <div className="product-card">
            <img
                style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '5px'
                }}
                src={image}
                alt="Image du produit"
            />
            <div className="products">
                <h2>{title}</h2>
                <p>Prix : {price} €</p>
                <a href={link} target="_blank" rel="noopener noreferrer">Voir le produit</a>
            </div>
        </div>
    );
};

// Composant principal
function App() {
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then((response) => response.json())
            .then((data) =>
                setProducts(
                    data.map((item: any) => ({
                        title: item['Nom du produit'],
                        price: item['Prix'],
                        link: item['Lien'],
                        image: item['Image'],
                    }))
                )
            )
            .catch((error) => console.error('Erreur de récupération des produits:', error));
    }, []);

    return (
        <div className="product-page">
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    padding: '20px'
                }}
                className="products-list"
            >
                {products.length === 0 ? (
                    <p>Chargement des produits...</p>
                ) : (
                    products.map((product, index) => (
                        <ProductCard
                            key={index}
                            title={product.title}
                            price={product.price}
                            link={product.link}
                            image={product.image}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
