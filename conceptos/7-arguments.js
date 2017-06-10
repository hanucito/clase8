const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

const books = [
  {
    id: 24,
    title: "(b) You Don't Know JS: Types & Grammar",
    author: 'Kyle Simpson',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41cRygYTmeL._AC_US436_FMwebp_QL65_.jpg'
  },
  {
    id: 18,
    title:
      '(b) Seven More Languages in Seven Weeks: Languages That Are Shaping the Future',
    author: 'Bruce Tate',
    image:
      'https://images-na.ssl-images-amazon.com/images/I/41pPn50VnvL._AC_US436_FMwebp_QL65_.jpg'
  }
];

const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const bookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Libros de UTN',
  fields: {
    id: {
      type: GraphQLID,
      description: 'The ID of the book'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the book'
      //resolve: () => 'hardcoded' // Ejemplo de un resolve local para title
    },
    author: {
      type: GraphQLString,
      description: 'The author of the book'
    },
    image: {
      type: GraphQLString,
      description: 'The image of the book'
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root of the query type',
  fields: {
    books: {
      type: new GraphQLList(bookType),
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of the book'
        }
      },
      resolve: (_, args) =>
        args.id ? books.filter(book => args.id == book.id) : books
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log(`Listen on http://localhost:3000`);
});
