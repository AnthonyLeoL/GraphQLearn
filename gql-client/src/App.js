import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading..."); //State hooks, the App component will re-render after calling setData \
  const [users, setUsers] = useState([]); // or setUsers
  const [isMarried, setIsMarried] = useState(false);
  const URL = "http://localhost:4000/graphql";

  const HelloWorld = `query  queryName {hello}`;

  const UserQuery = `
    query  queryName{
    getAllUsers {
      name
    }}`; //TODO Adjust this query to also return `age` and `married`

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
        variables: {}, //TODO change these two parameters to get users by marriage status
      }),
    });

    let { data } = await userData.json();

    console.log("🚀 ~ file: App.js ~ line 42 ~ getUsers ~ data", data);

    setUsers(data.getAllUsers ? data.getAllUsers : data.getUsersByStatus);
  };

  return (
    <div style={{ margin: "auto", width: "fit-content" }}>
      <div>{data}</div>
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
      <ul>
        <li>
          Can you adjust the query (client-side) to return the "age" and
          "married" fields as well?
        </li>
        <li>
          Can you create a new query that gets users based on marriage status?{" "}
        </li>{" "}
        <ul>
          <li>Here's a toggle to help: (variable is called isMarried)</li>

          <>
            <input type="checkbox" onChange={() => setIsMarried(!isMarried)} />{" "}
            {isMarried ? "Married" : "Single"}
          </>
        </ul>
        <li>Can you add a mutation to create a new user?</li>
      </ul>
    </div>
  );
}

export default App;
