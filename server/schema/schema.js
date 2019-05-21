const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

//Dummy data
var books = [
	{name:'The Winter Soldier', genre: 'Sci-Fi', id: '1', authordId: '1'},
	{name:'Avengers Assemble', genre: 'Sci-Fi', id: '2', authorId: '2'},
	{name:'Avengers: End Game', genre: 'Sci-Fi', id: '3', authorId: '3'},
];

var authors = [
	{name: 'Michael Bay', age: 55, id: '1'},
	{name: 'Isaac Newton', age: 33, id: '2'},
	{name: 'Anny Goldman', age: 28, id: '3'},
];

const BookType = new GraphQLObjectType ({
	name: 'Book',
	fields: () => ({
	  id: {type: GraphQLID},
	  name: {type: GraphQLString},
	  genre: {type: GraphQLString},
	  author: {
	    type: AuthorType,
	    resolve(parent, args){
		console.log(parent);
		return _.find(authors, {id: parent.authorId});
	    }
	  }
	})
});


const AuthorType = new GraphQLObjectType ({
	name: 'Authors',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt}
	})

});


const RootQuery = new GraphQLObjectType ({
	name: 'RootQueryType',
	fields: {
		book: {
		  type: BookType,
		  args: { id: { type: GraphQLID }},
		  resolve(parent, args){
	            return _.find(books, {id: args.id});
		  }
	     },
		author: {
		   type: AuthorType,
		   args: { id: { type: GraphQLID }},
		   resolve(parent, args){
		      return _.find(authors, {id: args.id});
		   }
	      }
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});

