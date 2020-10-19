require('dotenv').config();

module.exports = {
	env: {
		MY_STEP: process.env.MY_STEP,
	},
	serverRuntimeConfig: {
		// Will only be available on the server side
		MY_SECRET: process.env.MY_SECRET,
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		API_ENDPOINT: '/api/v1',
	},
};
