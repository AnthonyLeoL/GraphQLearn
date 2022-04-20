# GraphQLearn

## SETUP

open two terminals:

`cd gql-client/`

`npm install`

`npm start`

second terminal:

`cd gql-server/`

`npm install`

`npm start`

Client server runs on http://localhost:3000/

apollo graph-ql server runs on http://localhost:4000/graphql
(you may find it helpful to view this when creating queries)

## Goals

There are 3 goals, each has a branch (named goal1, goal2, goal3) with the completed code.
You can checkout to these branches at any time for the solutions.
You won't need to write any react code, (other than editing query strings within queries.js).
You will need to update the `schema.graphql` and the resolver functions in `/gql-server/index.js`
for goals 2 and 3.

<ol>
<li>adjust the existing `UserQuery` string in client/Queries.js to return the age and married fields </li>
<li>Finish the `getUsersByStatus` in /Queries.js, update the server/schema.graphql, write the resolver definition</li>
<li>Finish the `createUser` mutation in /Queries.js, update the server/schema.graphql, write the resolver definition</li>

</ol>
