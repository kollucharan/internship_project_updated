
import {gql,useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { addtocart } from '../../Slices/cartslice';

const QUERY_TO_GET_PRODUCT = gql`
query MyQuery ($id:Int!){
  products_by_pk(id: $id){
    name
    price
    description
    image_url
  }
}`
export default  function productdetails(){
    
    const {id} =useParams();
    const dispatch =useDispatch();
   // const {data,loading,error} =useQuery(QUERY_TO_GET_PRODUCT);
   const { data, loading, error } = useQuery(QUERY_TO_GET_PRODUCT, {
    variables: { id: parseInt(id) }, // Send ID as a variable
  });

  function helper(temp){
  
    dispatch(addtocart(temp))
    
  }

    if(loading) return <div>loading</div>
    if( error) return <div>Error is {error.message}</div>
    return (
     <div>
        <img src= {data.products_by_pk.image_url} style={{width:200,height:200}} alt="Network issue"/>
        <div>{data.products_by_pk.name}</div>
        <div>{data.products_by_pk.price}</div>
        <div>{data.products_by_pk.description}</div>
        <div> <button onClick={(()=>helper(data.products_by_pk))}>Add to cart</button></div>
     </div>

    )
}