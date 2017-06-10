'use strict';

const { graphql, buildSchema } = require('graphql');

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
	}

	type Schema {
		query: Query
	}
`
);

const resolvers = {
  book: () => {
    return {
      id: () => '24',
      title: "You Don't Know JS: Types & Grammar",
      author: () => 'Kyle Simpson',
      image: () =>
        'https://images-na.ssl-images-amazon.com/images/I/41cRygYTmeL._AC_US436_FMwebp_QL65_.jpg'
    };
  }
};

const query = `
	query fetchData {
		book {
			id
			title
			author
			image
		}
	}
`;

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(err => console.log(err));
