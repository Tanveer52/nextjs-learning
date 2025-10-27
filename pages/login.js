import React from "react";

function LoginPage() {
  return (
    <div>
      <h1 style={{ backgroundColor: "aqua", color: "black", padding: "2rem" }}>
        This is a Login Page
      </h1>
    </div>
  );
}

LoginPage.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <h2>Thsi si a eztra step</h2>
    </>
  );
};

export default LoginPage;
