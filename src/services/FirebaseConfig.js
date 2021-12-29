import React from 'react';
import {initializeApp, getApps} from 'firebase/app';
import {getAuth , onAuthStateChanged, signInAnonymously} from "firebase/auth";
import {ref, getDatabase, onValue, set, serverTimestamp, off, limitToLast, query, push} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
let app
if (!getApps.length) {
	const firebaseConfig = {
		apiKey: "AIzaSyCYH5Zrnnck-CqZTum8IQDskQjV3OsU8U8",
		authDomain: "backduapp.firebaseapp.com",
		databaseURL: "https://backduapp-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "backduapp",
		storageBucket: "backduapp.appspot.com",
		messagingSenderId: "663078431868",
		appId: "1:663078431868:web:b39ccbf65f61c5a6f02df9",
		measurementId: "G-4JYJLRE3WV"
	};
	app = initializeApp(firebaseConfig)
}
const db = getDatabase(app);
const dbRef = ref(db, `messages`);
const auth = getAuth();
onAuthStateChanged(auth, user => {
	signInAnonymously(auth)
		.then(() => {
			// Signed in..
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
	});
});
const uid = () => {
	return (auth.currentUser || {}).uid
}
const parse = snapshot => {
	const { timestamp, text, user } = snapshot.val();
	const { key: _id } = snapshot;
	const createdAt = new Date(timestamp);
	return {
		_id,
		createdAt,
		text,
		user,
	};
	// console.log('snappppppp', snapshot.key)
};

const on = callback => {
	return onValue(query(dbRef, limitToLast(20)), (snapshot => callback(parse(snapshot))))
};

const append = message => {
	push(dbRef, message);
};

const send = messages => {
	for (let i = 0; i < messages.length; i++) {
		const { text, user } = messages[i];
		const message = {
			text,
			user,
			timestamp: serverTimestamp(),
		};
		append(message);
	}
};
const offS = () => {return off(dbRef)}
export { offS }
export { send }
export { uid }
export { parse }
export { on }
export { db }
// Initialize Firebase