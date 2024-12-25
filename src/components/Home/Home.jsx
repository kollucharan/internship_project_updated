import { gql, useQuery } from '@apollo/client';
import Head from '../Head/Head';
import Filter from '../filter/Filter';
import Item from '../item/item';
import { useEffect, useState } from 'react';

const QUERY_TO_GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      image_url
    }
  }
`;

export default function Home() {
  const [submittedValue, setSubmittedValue] = useState(''); // Holds the value after submission

  const { data, loading, error } = useQuery(QUERY_TO_GET_PRODUCTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data?.products?.length) {
    return <div>No products available at the moment.</div>;
  }

  const searchName = typeof submittedValue === 'string' ? submittedValue.toLowerCase() : '';

  const productsToDisplay = data.products.filter((item) =>
    searchName ? item.name.toLowerCase().includes(searchName) : true
  );

  return (
    <div >
      <div>
        {/* Pass setSubmittedValue to the Head component */}
        <Head setSubmittedValue={setSubmittedValue} />
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <Filter />
        </div>
        <span>
          {productsToDisplay.length > 0 ? (
            productsToDisplay.map((item) => <Item key={item.id} product={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </span>
      </div>
    </div>
  );
}

