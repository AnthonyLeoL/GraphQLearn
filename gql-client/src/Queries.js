export const HelloWorld = `
    query {
      hello
    }
`;
//TODO (goal1) update this query to include `age` and `married`
export const UserQuery = ` 
  query {
    getAllUsers {
      name

  }
}
`;

//TODO (goal2) finish this query, add query to server
// (make sure the name of query matches the definition and resolver)
export const getUsersByStatus = ` 
  query($status: Boolean){
   
  `;
//TODO (goal3) finish this mutation, add mutation to server
export const createUser = `
  mutation ($name: String!, $age: Int, $married: Boolean) {

  }
  `;
