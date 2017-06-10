'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(
  `
	type Book {
		id: ID
    title: String
    author: String
    image: String
	}

	type Query {
		book: Book
		books: [Book]
	}

	type Schema {
		query: Query
	}
`
);

const books = [
  {
    id: 'b24',
    title: "(b) You Don't Know JS: Types & Grammar",
    author: 'Kyle Simpson',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41cRygYTmeL._AC_US436_FMwebp_QL65_.jpg'
  },
  {
    id: 'b18',
    title:
      '(b) Seven More Languages in Seven Weeks: Languages That Are Shaping the Future',
    author: 'Bruce Tate',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41pPn50VnvL._AC_US436_FMwebp_QL65_.jpg'
  }
];

const resolvers = {
  book: () => books[0],
  books: () => books
};

server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: resolvers
  })
);

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
