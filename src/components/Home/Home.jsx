import { gql, useQuery } from "@apollo/client";
import Head from "../Head/Head";
import Filter from "../filter/Filter";
import Item from "../item/item";
import { useEffect, useState } from "react";
import "./Home.css";
import { useSelector } from "react-redux";

const QUERY_TO_GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      image_url
      category {
        name
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_TO_GET_PRODUCTS);
  const [submittedValue, setSubmittedValue] = useState("");

  const categories = useSelector((state) => state.categories?.filters);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data?.products?.length) {
    return <div>No products available at the moment.</div>;
  }

  const searchName =
    typeof submittedValue === "string" ? submittedValue.toLowerCase() : "";

  const productsToDisplay = data.products.filter((item) =>
    searchName ? item.name.toLowerCase().includes(searchName) : true
  );

  const finalProducts = productsToDisplay.filter((item) => {
    if (categories.length === 0) {
      return true;
    }
    return categories.find((category) => category === item?.category?.name);
  });

  return (
    <div>
      <div>
        {/* Pass setSubmittedValue to the Head component */}
        <Head setSubmittedValue={setSubmittedValue} />
      </div>
      <div style={{ display: "flex" }}>
        <div className="filter-container">
          <Filter />
        </div>
        <div className="card-container">
          {finalProducts.length > 0 ? (
            finalProducts.map((item) => <Item key={item.id} product={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
