import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading..."); //State hooks, the App component will re-render after calling setData \
  const [users, setUsers] = useState([]); // or setUsers
  const URL = "http://localhost:4000/graphql";

  const HelloWorld = `query  queryName {hello}`;

  const UserQuery = `
    query  queryName{
    getAllUsers {
      name
    }}
  `; //Adjust this query

  useEffect(() => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: HelloWorld,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.data);
        setData(data.data.hello);
      });
  }, []);

  const getUsers = async () => {
    const userData = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: UserQuery,
      }),
    });

    let { data } = await userData.json();
    console.log(
      "🚀 ~ file: App.js ~ line 42 ~ getUsers ~ data",
      data.getAllUsers
    );

    setUsers(data.getAllUsers);
  };

  return (
    <div style={{ margin: "auto", width: "fit-content" }}>
      <div>{data}</div>
      <div>
        Can you adjust the query to return the "age" and "married" fields as
        well?
      </div>
      <button onClick={getUsers}>query backend</button> <div>Users:</div>
      <div>
        {users.map((user) => {
          return (
            <div>
              <span>{user.name ? `${user.name}  - ` : ""}</span>
              <span>{user.age ? `${user.age}  - ` : ""}</span>
              <span>
                married:
                {user.married !== undefined ? `${user.married}` : "unknown"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
