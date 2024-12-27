import { gql, useQuery, useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import "./cart.css";

const JOIN_QUERY = gql`
  query GetCartWithProductDetails($user_id: Int!) {
    cart(where: { user_id: { _eq: $user_id } }) {
      id
      product_id
      quantity
      product {
        # This is the related 'product' data
        id
        name
        price
        image_url
      }
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteCartItem($product_id: Int!, $user_id: Int!) {
    delete_cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
    ) {
      returning {
        id
        product_id
        user_id
        quantity
      }
    }
  }
`;

function Cart() {
  const stringifyUser = Cookies.get("user");
  const user = JSON.parse(stringifyUser);
  const [Deletefromcart] = useMutation(DELETE_MUTATION);

  const { data, loading, error } = useQuery(JOIN_QUERY, {
    variables: { user_id: user?.id },
    fetchPolicy: "network-only",
  });

  console.log(data);

  async function remove(producttodelete) {
    try {
      await Deletefromcart({
        variables: { product_id: producttodelete.id, user_id: user.id },
        fetchPolicy: "network-only",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="cart-component">
      <h2 className="head">Your Cart</h2>
      {data.cart.length === 0 ? (
        <p className="message">Your cart is empty.</p>
      ) : (
        data.cart.map((item, index) => (
          <div key={index} className="card">
            <img
              src={item.product.image_url}
              alt={item.product.name}
              style={{ maxWidth: "100px", marginTop: "5px" }}
              className="cart-image"
            />
            <div className="details">
              <p className="item-name">
                <strong>Product:</strong> {item.product.name}
              </p>
              <p className="item-quantity">
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <button onClick={() => remove(item.product)} className="remove">
                Remove From Cart
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
