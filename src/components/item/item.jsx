import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import {addtocart} from '../../Slices/cartslice'
import { useQuery,useMutation } from "@apollo/client";

export default function Item({product}){
   const dispatch =useDispatch();
    function Add(){
        dispatch(addtocart(product));

    }

    return (
        <div>
       <Link to ={`/product/${product.id}`}>  <div> <img src={product.image_url}  style={ {width:100,height:100}}alt="" /></div> </Link>
        <div>{product.price}</div>
        <div>{product.name}</div>
        <div> <button onClick={()=>{Add()}}>Add to cart</button></div>
        </div>
    )
}