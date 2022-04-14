import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading..."); //State hooks, the App component will re-render after calling setData \
  const [users, setUsers] = useState([]); // or setUsers
  const [isMarried, setIsMarried] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    age: 0,
    married: false,
  });
  const URL = "http://localhost:4000/graphql";

  const HelloWorld = `query  queryName {hello}`;

  const UserQuery = `
    query  queryName{
    getAllUsers {
      name
      age
      married
    }}`;

  const getUsersByStatus = `
  query test($status: Boolean){

  }
  `;
  const createUser = `
  mutation Mutation($name: String!, $age: Int, $married: Boolean) {

  }
  `;

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

    console.log("🚀 ~ file: App.js ~ line 42 ~ getUsers ~ data", data);

    setUsers(data.getAllUsers);
  };

  const getUsersByMarried = async () => {
    const userData = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: getUsersByStatus,
        variables: { status: isMarried },
      }),
    });

    let { data } = await userData.json();

    console.log("🚀 ~ file: App.js ~ line 42 ~ getUsers ~ data", data);

    setUsers(data.getAllUsers ? data.getAllUsers : data.getUsersByStatus);
  };
  const postUser = async () => {
    const userData = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: createUser,
        variables: {
          name: newUser.name,
          age: Number(newUser.age),
          married: Boolean(newUser.married),
        },
      }),
    });

    let { data } = await userData.json();

    console.log("🚀 ~ file: App.js ~ line 42 ~ getUsers ~ data", data);

    setUsers(data.createUser ? [...users, data.createUser] : users);
  };
  const updateNewUser = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(
      "🚀 ~ file: App.js ~ line 78 ~ updateNewUser ~ newUser",
      newUser
    );
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
          Can you create a new query that gets users based on marriage status?
          <ul>(client and server-side)</ul>
        </li>{" "}
        <ul>
          <li>Here's a toggle to help: (variable is called isMarried)</li>
          <>
            <input type="checkbox" onChange={() => setIsMarried(!isMarried)} />{" "}
            {isMarried ? "Married" : "Single"}
          </>{" "}
          <li>
            <button onClick={getUsersByMarried}>Send Query</button>
          </li>
        </ul>
        <li>Can you add a mutation to create a new user?</li>
        <ul>(client and server-side)</ul>
        <ul>
          <li>
            <input
              name="name"
              type="text"
              placeholder="name"
              value={newUser.name}
              required
              onChange={updateNewUser}
            />
          </li>
          <li>
            <input
              type="number"
              placeholder="age"
              name="age"
              value={newUser.age}
              onChange={updateNewUser}
            />
          </li>
          <li>
            <input
              type="checkbox"
              name="married"
              value={newUser.marriageStatus}
              onChange={updateNewUser}
            />{" "}
            is married
          </li>
          <li>
            <button onClick={postUser}>Create!</button>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default App;
