import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    // Cart state lifted to App level so it can be shared across pages
    const [cart, setCart] = useState([]);

    // Products state also lifted so stock updates persist across page switches
    const [products, setProducts] = useState([
        {
            id: 1,
            title: 'Smartphone',
            description: 'Latest model with advanced features',
            price: 699,
            stock: 15,
            imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone'
        },
        {
            id: 2,
            title: 'Laptop',
            description: 'Powerful laptop for work and gaming',
            price: 1299,
            stock: 8,
            imageUrl: 'https://via.placeholder.com/300x150?text=Laptop'
        },
        {
            id: 3,
            title: 'Headphones',
            description: 'Noise-cancelling wireless headphones',
            price: 249,
            stock: 23,
            imageUrl: 'https://via.placeholder.com/300x150?text=Headphones'
        },
        {
            id: 4,
            title: 'Smartwatch',
            description: 'Fitness tracking and notifications',
            price: 199,
            stock: 12,
            imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch'
        }
    ]);

    // Simple navigation state management
    const handleNavigate = (pageId) => {
        setCurrentPage(pageId);
    };

    // Add product to cart
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Remove one item from cart
    const removeFromCart = (productId) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        // Restore stock
        setProducts(products.map(p =>
            p.id === productId ? { ...p, stock: p.stock + 1 } : p
        ));

        // Update cart
        if (item.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== productId));
        }
    };

    // Total number of items in the cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Render the appropriate page based on state
    const renderPage = () => {
        switch (currentPage) {
            case 'products':
                return (
                    <ProductsPage
                        cart={cart}
                        onAddToCart={addToCart}
                        onRemoveFromCart={removeFromCart}
                        products={products}
                        onUpdateProducts={setProducts}
                    />
                );
            case 'profile':
                return (
                    <ProfilePage
                        cart={cart}
                        onRemoveFromCart={removeFromCart}
                    />
                );
            case 'cart':
                return (
                    <CartPage
                        cart={cart}
                        onRemoveFromCart={removeFromCart}
                        onNavigate={handleNavigate}
                    />
                );
            case 'home':
            default:
                return (
                    <HomePage
                        onNavigate={handleNavigate}
                        cart={cart}
                        onRemoveFromCart={removeFromCart}
                    />
                );
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <Header
                currentPage={currentPage}
                onNavigate={handleNavigate}
                cartItemCount={cartItemCount}
            />

            <main>
                {renderPage()}
            </main>

            <footer style={{
                marginTop: '50px',
                padding: '20px',
                borderTop: '1px solid #eee',
                textAlign: 'center',
                color: '#666'
            }}>
                <p>React Multi-Page Application</p>
            </footer>
        </div>
    );
}

export default App;
