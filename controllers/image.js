const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '247bda5d6a1d4af4aa596d74d10be685'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Error performing Clarifai API call'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users')
	  .where('id', '=', id)
	  .increment('entries', 1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0]);
	  })
	  .catch(err => res.status(400).json('Error updating the entry count'));
}

module.exports = {
	handleImage,
	handleApiCall
}