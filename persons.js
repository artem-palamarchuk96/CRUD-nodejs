var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
	name: String,
	surname: String,
	age: Number,
	email: String
});

var Person = module.exports = mongoose.model('persons_model', personSchema, 'people');




module.exports.createDoc = function(data) {
	var person = new Person({
		name: data.name,
		surname: data.surname,
		age: data.age,
		email: data.email,
	});
	return Person.collection.insert(person).then().catch(function(err) {
		console.log('Failed to insert data to db, error - ', err);
	});
};

module.exports.readDoc = function() {
	return Person.find().then().catch(function(err) {
		console.log('Failed to find data from db, error - ', err);
	});
};

module.exports.deleteDoc = function(data) {
	return Person.find({'_id' : data.id}).remove().then().catch(function(err) {
		console.log('Failed to delete data from db, error - ', err);
	});
}

module.exports.updateDoc = function(data) {
	return Person.findOneAndUpdate({'_id' : data._id}, data).then().catch(function(err) {
		console.log('Failed to update data to db, error - ', err);
	})
}