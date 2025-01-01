
import {gql,useQuery} from '@apollo/client'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useSelector,useDispatch } from 'react-redux';
// import { addtocart } from '../../Slices/cartslice';
// import Head from '../Head/Head';
import './productdetails.css'

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
   const { data, loading, error } = useQuery(QUERY_TO_GET_PRODUCT, {
    variables: { id: parseInt(id) }, // Send ID as a variable
    fetchPolicy: "network-only",
     context: {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt_token")}`, // Add JWT token here
          },
        },
  });
  if (loading) {
    return (
      <div className="loading-container">
        <center>loading...</center>
      </div>
    );
  }
    if( error) return <div>Error is {error.message}</div>
    return (
     <div className='productdetailsdiv'>
    
        <img className='imgproductdetails' src= {data.products_by_pk.image_url} style={{width:200,height:200}} alt="Network issue"/>
        <p className='pproductdetails'>{data.products_by_pk.name}</p>
        <p className='pproductdetails'>${data.products_by_pk.price}</p>
        <p className='pproductdetails'>{data.products_by_pk.description}</p>
        
     </div>

    )
}