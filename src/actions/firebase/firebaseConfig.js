import sensitiveVariables from '../../sensitiveVariables';

const firebaseConfig = {
	apiKey: sensitiveVariables.apiKey || process.env.apiKey,
	authDomain: 'petfinder-skylab.firebaseapp.com' || process.env.authDomain,
	databaseURL:
		'https://petfinder-skylab.firebaseio.com' || process.env.databaseURL,
	projectId: 'petfinder-skylab' || process.env.projectId,
	storageBucket: 'petfinder-skylab.appspot.com' || process.env.storageBucket,
	messagingSenderId:
		sensitiveVariables.messagingSenderId || process.env.messagingSenderId,
	appId: sensitiveVariables.appId || process.env.appId
};

export default firebaseConfig;
