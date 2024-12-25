import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../Slices/cartslice';  

function Cart() {
  const dispatch = useDispatch();  // Use dispatch to dispatch actions
  const itemsInCart = useSelector((state) => state.cart.itemsincart); // use selector to Access cart items

  const handleRemove = (itemId) => {
    dispatch(removeFromCart({ id: itemId })); 
  };

  return (
    <div>
      <h2>Cart</h2>
      {itemsInCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {itemsInCart.map((item) => (
            <div key={item.id} style={{ display: 'flex', marginBottom: '20px' }}>
              <img src={item.image_url} alt={item.name} style={{ width: 100, height: 100, marginRight: '10px' }} />
              <div>
                <p>{item.name} - Quantity: {item.quantity}</p>
                <button onClick={() => handleRemove(item.id)}>Remove from cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
