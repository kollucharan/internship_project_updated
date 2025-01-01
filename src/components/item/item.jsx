// import { Link } from "react-router-dom";
// import { useMutation, gql, useLazyQuery } from "@apollo/client";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import './item.css'
// import { addtocount,removefromcount } from "../../Slices/countslice";

// const CHECKING_ITEM_INCART = gql`
//   query GetCartByProductId($product_id: Int!, $user_id: Int!) {
//     cart(
//       where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
//     ) {
//       id
//       quantity
//     }
//   }
// `;

// // Mutation to add item to the cart (with quantity 1)
// const ADD_ITEM_TOCART = gql`
//   mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
//     insert_cart_one(
//       object: { product_id: $product_id, user_id: $user_id, quantity: 1 }
//     ) {
//       id
//       product_id
//       user_id
//       quantity
//     }
//   }
// `;

// // Mutation to update the quantity of an existing item in the cart
// const UPDATE_CART = gql`
//   mutation IncrementCartQuantity($product_id: Int!, $user_id: Int!) {
//     update_cart(
//       where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
//       _inc: { quantity: 1 }
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

//  const DELETE_PRODUCT = gql `
//   mutation MyMutation($id: Int!) {
//     update_products_by_pk(
//       pk_columns: { id: $id }
//       _set: { is_deleted: true }
//     ) {
//       id
//       is_deleted
//     }
//   }
// `;
   
// export default function Item({ product ,refetchproducts }) {
//   const dispatch=useDispatch();
//   const [fetchCart, { loading: cartLoading, error: cartError }] = useLazyQuery(CHECKING_ITEM_INCART);
//   const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
//   const [updateCart] = useMutation(UPDATE_CART);

//   const [removeproduct] =useMutation(DELETE_PRODUCT);
//   const stringifyUser = Cookies.get("user");
//   const user = JSON.parse(stringifyUser);
//   const isadmin =user.is_admin;

//   const deleteproduct =async()=>{
//     await  removeproduct({
//       variables :{
//         id:  product.id,
//       },
//     })

//     refetchproducts();
//      }

//   const handleAddToCart = async () => {
//     try {
      
//       const { data } = await fetchCart({
//         variables: { product_id: product.id, user_id: user.id },
//         fetchPolicy: "network-only",
//       });  
//       if (data?.cart?.length > 0) {
//         await updateCart({
//           variables: {
//             product_id: product.id,
//             user_id: user.id,
//           },
//         });
//       } else {
//         // If the product does not exist in the cart, add it
//         await addItemToCart({
//           variables: {
//             product_id: product.id,
//             user_id: user.id,
//           },
//         });
//       }


//     // dispatch(addtocount());

//     } catch (error) {
//       console.error("Error while adding/updating cart:", error.message);
//     }
//       dispatch(addtocount());
//   };

//   if (cartLoading) return <p>Loading ...</p>;
//   if (cartError) return <p>Error: {cartError.message}</p>;

//   return (
//     <div className="card-item">
//       <Link to={`/product/${product.id}`}>
//         <div>
//           <img
//           className="image"
//             src={product.image_url}
//             style={{ width: 100, height: 100 }}
//             alt={product.name}
//           />
//         </div>
//       </Link>
//       <p className="price">${product.price}</p>
//       <p className="name">{product.name}</p>
//       <div>
//      { !isadmin && <button onClick={handleAddToCart} className="button">Add to Cart</button>   }
//           { isadmin && <button onClick={deleteproduct} className="button">Delete Product</button> } 
//       </div>
//     </div>
//   );
// }


// import { Link } from "react-router-dom";
// import { useMutation, gql, useLazyQuery } from "@apollo/client";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import './item.css';
// import { addtocount } from "../../Slices/countslice";

// // Query to check if the product exists in the cart
// const CHECKING_ITEM_INCART = gql`
//   query GetCartByProductId($product_id: Int!, $user_id: Int!) {
//     cart(
//       where: { product_id: { _eq: $product_id }, user_id: { _eq: $user_id } }
//     ) {
//       id
//       quantity
//       is_deleted
//     }
//   }
// `;

// // Mutation to insert a new cart item with is_deleted: false
// const ADD_ITEM_TOCART = gql`
//   mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
//     insert_cart_one(
//       object: { product_id: $product_id, user_id: $user_id, quantity: 1, is_deleted: false }
//     ) {
//       id
//       product_id
//       user_id
//       quantity
//       is_deleted
//     }
//   }
// `;

// // Mutation to increment quantity for active items (is_deleted: false)
// const UPDATE_CART = gql`
//   mutation IncrementCartQuantity($product_id: Int!, $user_id: Int!) {
//     update_cart(
//       where: {
//         product_id: { _eq: $product_id },
//         user_id: { _eq: $user_id },
//         is_deleted: { _eq: false }
//       }
//       _inc: { quantity: 1 }
//     ) {
//       returning {
//         id
//         product_id
//         user_id
//         quantity
//         is_deleted
//       }
//     }
//   }
// `;

// // Mutation to delete a product (mark as is_deleted: true)
// const DELETE_PRODUCT = gql`
//   mutation MyMutation($id: Int!) {
//     update_products_by_pk(
//       pk_columns: { id: $id }
//       _set: { is_deleted: true }
//     ) {
//       id
//       is_deleted
//     }
//   }
// `;

// export default function Item({ product, refetchproducts }) {
//   const dispatch = useDispatch();
//   const [fetchCart, { loading: cartLoading, error: cartError }] = useLazyQuery(CHECKING_ITEM_INCART);
//   const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
//   const [updateCart] = useMutation(UPDATE_CART);
//   const [removeProduct] = useMutation(DELETE_PRODUCT);

//   const stringifyUser = Cookies.get("user");
//   const user = JSON.parse(stringifyUser);
//   const isAdmin = user.is_admin;

//   const deleteProduct = async () => {
//     await removeProduct({
//       variables: {
//         id: product.id,
//       },
//     });
//     refetchproducts();
//   };

//   const handleAddToCart = async () => {
//     try {
//       // Fetch existing cart item
//       const { data } = await fetchCart({
//         variables: { product_id: product.id, user_id: user.id },
//         fetchPolicy: "network-only",
//       });

//       const existingItem = data?.cart?.[0];

//       if (existingItem) {
//         if (existingItem.is_deleted) {
//           // Insert a new record with is_deleted: false
//           await addItemToCart({
//             variables: {
//               product_id: product.id,
//               user_id: user.id,
//             },
//           });
//         } else {
//           // Increment quantity for active items
//           await updateCart({
//             variables: {
//               product_id: product.id,
//               user_id: user.id,
//             },
//           });
//         }
//       } else {
//         // If the product is not in the cart, insert a new record
//         await addItemToCart({
//           variables: {
//             product_id: product.id,
//             user_id: user.id,
//           },
//         });
//       }

//       // Update count in Redux store
//       dispatch(addtocount());
//     } catch (error) {
//       console.error("Error while adding/updating cart:", error.message);
//     }
//   };

//   if (cartLoading) return <p>Loading...</p>;
//   if (cartError) return <p>Error: {cartError.message}</p>;

//   return (
//     <div className="card-item">
//       <Link to={`/product/${product.id}`}>
//         <div>
//           <img
//             className="image"
//             src={product.image_url}
//             style={{ width: 100, height: 100 }}
//             alt={product.name}
//           />
//         </div>
//       </Link>
//       <p className="price">${product.price}</p>
//       <p className="name">{product.name}</p>
//       <div>
//         {!isAdmin && (
//           <button onClick={handleAddToCart} className="button">
//             Add to Cart
//           </button>
//         )}
//         {isAdmin && (
//           <button onClick={deleteProduct} className="button">
//             Delete Product
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
//  changed part
// import { Link } from "react-router-dom";
// import { useMutation, gql, useLazyQuery } from "@apollo/client";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import "./item.css";
// import { addtocount } from "../../Slices/countslice";

// // Query to check if the product exists in the cart (filter by is_deleted: false)
// const CHECKING_ITEM_INCART = gql`
//   query GetCartByProductId($product_id: Int!, $user_id: Int!) {
//     cart(
//       where: {
//         product_id: { _eq: $product_id },
//         user_id: { _eq: $user_id },
//         is_deleted: { _eq: false }
//       }
//     ) {
//       id
//       quantity
//       is_deleted
//     }
//   }
// `;

// // Mutation to insert a new cart item with is_deleted: false
// const ADD_ITEM_TOCART = gql`
//   mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
//     insert_cart_one(
//       object: { product_id: $product_id, user_id: $user_id, quantity: 1, is_deleted: false }
//     ) {
//       id
//       product_id
//       user_id
//       quantity
//       is_deleted
//     }
//   }
// `;

// // Mutation to increment quantity for active items (is_deleted: false)
// const UPDATE_CART = gql`
//   mutation IncrementCartQuantity($product_id: Int!, $user_id: Int!) {
//     update_cart(
//       where: {
//         product_id: { _eq: $product_id },
//         user_id: { _eq: $user_id },
//         is_deleted: { _eq: false }
//       }
//       _inc: { quantity: 1 }
//     ) {
//       returning {
//         id
//         product_id
//         user_id
//         quantity
//         is_deleted
//       }
//     }
//   }
// `;

// // Mutation to restore a deleted cart item (set is_deleted to false)
// const RESTORE_CART_ITEM = gql`
//   mutation RestoreCartItem($id: Int!) {
//     update_cart_by_pk(
//       pk_columns: { id: $id }
//       _set: { is_deleted: false }
//       _inc: { quantity: 1 }
//     ) {
//       id
//       product_id
//       user_id
//       quantity
//       is_deleted
//     }
//   }
// `;

// // Mutation to delete a product (mark as is_deleted: true)
// const DELETE_PRODUCT = gql`
//   mutation MyMutation($id: Int!) {
//     update_products_by_pk(
//       pk_columns: { id: $id }
//       _set: { is_deleted: true }
//     ) {
//       id
//       is_deleted
//     }
//   }
// `;

// export default function Item({ product, refetchproducts }) {
//   const dispatch = useDispatch();
//   const [fetchCart, { loading: cartLoading, error: cartError }] = useLazyQuery(CHECKING_ITEM_INCART);
//   const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
//   const [updateCart] = useMutation(UPDATE_CART);
//   const [restoreCartItem] = useMutation(RESTORE_CART_ITEM);
//   const [removeProduct] = useMutation(DELETE_PRODUCT);

//    const headers = {
//       Authorization: `Bearer ${Cookies.get("jwt_token")}`, // Replace 'authToken' with your token name
      
//     };

//   const stringifyUser = Cookies.get("user");
//   const user = JSON.parse(stringifyUser);
//   const isAdmin = user.is_admin;

//   const deleteProduct = async () => {
//     await removeProduct({
//       variables: {
//         id: product.id,
//       },
//       context: {
//         headers,
//       },
//     });
//     refetchproducts();
//   };

//   const handleAddToCart = async () => {
//     try {
//       // Fetch existing cart item
//       const { data } = await fetchCart({
//         variables: { product_id: product.id, user_id: user.id },
//         fetchPolicy: "network-only",
//         context: {
//           headers,
//         },
//       });

//       const existingItem = data?.cart?.[0];

//       if (existingItem) {
//         if (existingItem.is_deleted) {
//           // Restore the existing item by setting is_deleted to false and increment quantity
//           await restoreCartItem({
//             variables: {
//               id: existingItem.id,
//             },
//             context: {
//               headers,
//             },
//           });
//         } else {
//           // Increment quantity for active items
//           await updateCart({
//             variables: {
//               product_id: product.id,
//               user_id: user.id,
//             },
//             context: {
//               headers,
//             },
//           });
//         }
//       } else {
//         // Insert a new item if it doesn't exist in the cart
//         await addItemToCart({
//           variables: {
//             product_id: product.id,
//             user_id: user.id,
//           },
//           context: {
//             headers,
//           },
//         });
//       }

//       // Update count in Redux store
//       dispatch(addtocount());
//     } catch (error) {
//       console.error("Error while adding/updating cart:", error.message);
//     }
//   };

//   if (cartLoading) return <p>Loading...</p>;
//   if (cartError) return <p>Error: {cartError.message}</p>;

//   return (
//     <div className="card-item">
//       <Link to={`/product/${product.id}`}>
//         <div>
//           <img
//             className="image"
//             src={product.image_url}
//             style={{ width: 100, height: 100 }}
//             alt={product.name}
//           />
//         </div>
//       </Link>
//       <p className="price">${product.price}</p>
//       <p className="name">{product.name}</p>
//       <div>
//         {!isAdmin && (
//           <button onClick={handleAddToCart} className="button">
//             Add to Cart
//           </button>
//         )}
//         {isAdmin && (
//           <button onClick={deleteProduct} className="button">
//             Delete Product
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./item.css";
import {  incrementCartCount } from "../../Slices/countslice";

// Query to check if the product exists in the cart
const CHECKING_ITEM_INCART = gql`
  query GetCartByProductId($product_id: Int!, $user_id: Int!) {
    cart(
      where: {
        product_id: { _eq: $product_id },
        user_id: { _eq: $user_id }
      }
    ) {
      id
      quantity
      is_deleted
    }
  }
`;

// Mutation to insert a new cart item
const ADD_ITEM_TOCART = gql`
  mutation AddItemToCart($product_id: Int!, $user_id: Int!) {
    insert_cart_one(
      object: { product_id: $product_id, user_id: $user_id, quantity: 1, is_deleted: false }
    ) {
      id
      product_id
      user_id
      quantity
      is_deleted
    }
  }
`;

// Mutation to increment quantity for active items (is_deleted: false)
const UPDATE_CART = gql`
  mutation IncrementCartQuantity($product_id: Int!, $user_id: Int!) {
    update_cart(
      where: {
        product_id: { _eq: $product_id },
        user_id: { _eq: $user_id },
        is_deleted: { _eq: false }
      }
      _inc: { quantity: 1 }
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

// Mutation to delete a product (mark as is_deleted: true)
const DELETE_PRODUCT = gql`
  mutation MyMutation($id: Int!) {
    update_products_by_pk(
      pk_columns: { id: $id }
      _set: { is_deleted: true }
    ) {
      id
      is_deleted
    }
  }
`;

export default function Item({ product, refetchproducts }) {
  const dispatch = useDispatch();
  const [fetchCart, { loading: cartLoading, error: cartError }] = useLazyQuery(CHECKING_ITEM_INCART);
  const [addItemToCart] = useMutation(ADD_ITEM_TOCART);
  const [updateCart] = useMutation(UPDATE_CART);
  const [removeProduct] = useMutation(DELETE_PRODUCT);

  const headers = {
    Authorization: `Bearer ${Cookies.get("jwt_token")}`,
  };

  const stringifyUser = Cookies.get("user");
  const user = JSON.parse(stringifyUser);
  const isAdmin = user.is_admin;

  const deleteProduct = async () => {
    await removeProduct({
      variables: {
        id: product.id,
      },
      context: {
        headers,
      },
    });
    refetchproducts();
  };

  const handleAddToCart = async () => {
    try {
      // Fetch existing cart item
      const { data } = await fetchCart({
        variables: { product_id: product.id, user_id: user.id },
        fetchPolicy: "network-only",
        context: {
          headers,
        },
      });

      const existingItems = data?.cart || [];
      const activeItem = existingItems.find(item => !item.is_deleted);
      const deletedItem = existingItems.find(item => item.is_deleted);

      if (activeItem) {
        // Increment quantity for active items
        await updateCart({
          variables: {
            product_id: product.id,
            user_id: user.id,
          },
          context: {
            headers,
          },
        });
      } else if (deletedItem) {
        // Add a new entry for the deleted item
        await addItemToCart({
          variables: {
            product_id: product.id,
            user_id: user.id,
          },
          context: {
            headers,
          },
        });
      } else {
        // Insert a new item if it doesn't exist in the cart
        await addItemToCart({
          variables: {
            product_id: product.id,
            user_id: user.id,
          },
          context: {
            headers,
          },
        });
      }

      // Update count in Redux store
      dispatch(incrementCartCount());
    } catch (error) {
      console.error("Error while adding/updating cart:", error.message);
    }
  };

  if (cartLoading) return <p>Loading...</p>;
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
        {!isAdmin && (
          <button onClick={handleAddToCart} className="button">
            Add to Cart
          </button>
        )}
        {isAdmin && (
          <button onClick={deleteProduct} className="button">
            Delete Product
          </button>
        )}
      </div>
    </div>
  );
}
