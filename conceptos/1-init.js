'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
	type Query {
		foo: String
	}
`);

const resolver = {
  foo: () => 'var'
};

const query = `
	{
		foo
	}
`;

graphql(schema, query, resolver)
  .then(result => console.log(result))
  .catch(err => console.log(err));
