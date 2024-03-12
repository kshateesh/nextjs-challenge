import React from "react";
import Image from "next/image";
import pixelPaws from "./pixel-paws.jpg";

export default function Page({ pawsArmy }) {
  return (
    <div>
      <h1>🔥Pixel Paws 🔥</h1>
      <Image src={pixelPaws} width={100} height={100} alt="Logo" />
      <div>
        {pawsArmy.map((obj) => {
          return (
            <div>
              <img src={obj.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10"
  );
  const pawsArmy = await res.json();

  return {
    props: {
      pawsArmy,
    },
  };
}
