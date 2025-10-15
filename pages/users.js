import React from "react";

function UsersList({ users }) {
  return (
    <div>
      <h1>Users List for: {users.length} users</h1>
      {users.map((user) => (
        <div key={user.email} style={{ paddingBottom: "20px" }}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UsersList;

export async function getStaticProps() {
  const rawData = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await rawData.json();

  return {
    props: {
      users: data,
    },
  };
}
