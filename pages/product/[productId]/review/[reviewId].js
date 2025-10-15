import { useRouter } from "next/router";

import React from "react";

function ReviewId() {
  const { query } = useRouter();

  // console.log(query);
  // const { productId, reviewId } = useRouter();

  // console.log(productId, reviewId);
  return (
    <div>
      Showing route for: /appp/product/{query.productId}/review/{query.reviewId}
    </div>
  );
}

export default ReviewId;
