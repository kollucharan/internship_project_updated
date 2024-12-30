import { Link } from "react-router-dom";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { useSelector,useDispatch } from "react-redux";
import Cookies from "js-cookie";
import './item.css'
import { use } from "react";
import { addtocount,removefromcount } from "../../Slices/countslice";
const CHECKING_ITEM_INCART = gql`
  query GetCartByProductId($product_id: Int!, $user_id: Int!) {
    cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
    ) {
      id
      quantity
    }
  }
`;

// Mutation to add item to the cart (with quantity 1)
const ADD_ITEM_TOCART = gql`
  mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
    insert_cart_one(
      object: { product_id: $product_id, user_id: $user_id, quantity: 1 }
    ) {
      id
      product_id
      user_id
      quantity
    }
  }
`;

// Mutation to update the quantity of an existing item in the cart
const UPDATE_CART = gql`
  mutation IncrementCartQuantity($product_id: Int!, $user_id: Int!) {
    update_cart(
      where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
      _inc: { quantity: 1 }
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

 const DELETE_PRODUCT = gql `
   
  mutation MyMutation ($id: Int!) {
  delete_products_by_pk(id: $id){
    id
  }
}
   `


export default function Item({ product ,refetchproducts }) {
  const dispatch=useDispatch();
  // const user={ user }
   
  const [fetchCart, { loading: cartLoading, error: cartError }] =
    useLazyQuery(CHECKING_ITEM_INCART);

  const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
  const [updateCart] = useMutation(UPDATE_CART);
  const [removeproduct] =useMutation(DELETE_PRODUCT);
  // const user= useSelector((state) => state.userdetails.user?.[0]);
  const stringifyUser = Cookies.get("user");
  const user = JSON.parse(stringifyUser);

    //   const deleteproduct =async()=>{
      
    // await  removeproduct({
    //   variables :{
    //     id:  product.id,
    //   },
    // })

    // refetchproducts();
    //  }

  const handleAddToCart = async () => {
    try {
      // Trigger the lazy query to check if the item exists in the cart

      const { data } = await fetchCart({
        variables: { product_id: product.id, user_id: user.id },
        fetchPolicy: "network-only",
      });

      // If the product is already in the cart, update the quantity
      if (data?.cart?.length > 0) {
        // const cartItem = data.cart[0]; // Only one item should exist due to the query
        await updateCart({
          variables: {
            product_id: product.id,
            user_id: user.id,
          },
        });
      } else {
        // If the product does not exist in the cart, add it
        await addItemToCart({
          variables: {
            product_id: product.id,
            user_id: user.id,
          },
        });
      }


    // dispatch(addtocount());

    } catch (error) {
      console.error("Error while adding/updating cart:", error.message);
    }
      dispatch(addtocount());
  };

  if (cartLoading) return <p>Loading ...</p>;
  if (cartError) return <p>Error: {cartError.message}</p>;

  return (
    <div className="card-item">
      <Link to={`/product/${product.id}`}>
        <div>
          <img
          className="image"
            src={product.image_url}
            style={{ width: 100, height: 100 }}
            alt={product.name}
          />
        </div>
      </Link>
      <p className="price">${product.price}</p>
      <p className="name">{product.name}</p>
      <div>
       <button onClick={handleAddToCart} className="button">Add to Cart</button>  
          {/* {isadmin && <button onClick={deleteproduct} className="button">Delete Product</button> */} 
      </div>
    </div>
  );
}
