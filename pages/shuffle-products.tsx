import React, { useEffect, useState } from "react";

export default function Products({ product }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const randomId = Math.floor(Math.random() * 100);

  return (
    <div>
      <h1>Products</h1>
      <div>
        <span>randomid: {isClient ? randomId : 0}</span>
        <span>brand:{product.brand}</span>
        <span>Equipment:{product.equipment}</span>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://random-data-api.com/api/v2/appliances");
  const product = await res.json();
  console.log({ product });
  return {
    props: {
      product,
    },
  };
}
