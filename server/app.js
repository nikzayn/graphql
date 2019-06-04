const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();


//Databse mlab setup
mongoose.connect('mongodb://nikhil:nikhil123@ds033123.mlab.com:33123/vecturum');
mongoose.connection.once('open', () => {
   console.log("Connected to Database");	
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
	useNewUrlParser: true
}));

app.listen(3000, () => {
	console.log("Application is running on PORT 3000");
});
