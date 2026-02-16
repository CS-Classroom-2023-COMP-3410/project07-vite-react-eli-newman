import ShoppingCart from '../components/ShoppingCart';
import Button from '../components/Button';

function CartPage({ cart, onRemoveFromCart, onNavigate }) {
    return (
        <div>
            <h1>Cart Page</h1>

            <div style={{ maxWidth: '500px' }}>
                <ShoppingCart cart={cart} onRemoveFromCart={onRemoveFromCart} />
            </div>

            <div style={{ marginTop: '20px' }}>
                <Button onClick={() => onNavigate('products')} variant="primary">
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
}

export default CartPage;
