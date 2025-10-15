import React from "react";
import { useRouter } from "next/router";

function Docs() {
  const router = useRouter();

  const { params = [] } = router.query;

  console.log(params);
  return (
    <div>
      <h1>Show Docs For</h1>
      <ol>
        {params.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export default Docs;
