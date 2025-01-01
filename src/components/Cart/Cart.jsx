import { gql, useQuery, useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import "./cart.css";
import {setCartCount, incrementCartCount, decrementCartCount } from '../../Slices/countslice'
import { useDispatch } from "react-redux";
   
// const JOIN_QUERY = gql`
//   query GetCartWithProductDetails($user_id: Int!) {
//     cart(where: { user_id: { _eq: $user_id } }) {
//       id
//       product_id
//       quantity
//       product {
//         # This is the related 'product' data
//         id
//         name
//         price
//         image_url
//       }
//     }
//   } `

// const JOIN_QUERY = gql`

//   query GetCartWithProductDetails($user_id: Int!) {
//   cart(where: { user_id: { _eq: $user_id }, product: { is_deleted: { _eq: false } } }) {
//     id
//     product_id
//     quantity
//     product {
//       id
//       name
//       price
//       image_url
//     }
//   }
// }

// `;

 const JOIN_QUERY = gql`

  query GetCartWithProductDetails($user_id: Int!) {
  cart(
    where: {
      user_id: { _eq: $user_id },
      is_deleted: { _eq: false }, # Check for non-deleted cart items
      product: { is_deleted: { _eq: false } } # Check for non-deleted products
    }
  ) {
    id
    product_id
    quantity
    product {
      id
      name
      price
      image_url
    }
  }
}


`;


// const DELETE_MUTATION = gql`
//   mutation DeleteCartItem($product_id: Int!, $user_id: Int!) {
//     delete_cart(
//       where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
//     ) {
//       returning {
//         id
//         product_id
//         user_id
//         quantity
//       }
//     }
//   }
// `;

const DELETE_MUTATION = gql`
   mutation DeleteCartItem($product_id: Int!, $user_id: Int!) {
    update_cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } },
      _set: { is_deleted: true }
    ) {
      returning {
        id
        product_id
        user_id
        quantity
        is_deleted
      }
    }
  }
`;

function Cart() {
  const stringifyUser = Cookies.get("user");
  const user = JSON.parse(stringifyUser);
  const [Deletefromcart] = useMutation(DELETE_MUTATION);
  const dispatch=useDispatch();
  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`, // Replace 'authToken' with your token name
    
  };

  const { data, loading, error, refetch } = useQuery(JOIN_QUERY, {
    variables: { user_id: user?.id },
    fetchPolicy: "network-only",
    context: {
      headers,
    },
  
  });

  async function remove(producttodelete) {
  
    try {
      await Deletefromcart({
        variables: {
          product_id: producttodelete?.product_id,
          user_id: user.id,
        },

        context: {
          headers,
        },
        // fetchPolicy: "network-only",
      });
      // window.location.reload();

    //  dispatch(removefromcount(producttodelete.quantity));
      dispatch(decrementCartCount(producttodelete.quantity));
      refetch();
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
              <button onClick={() => remove(item)} className="remove">
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