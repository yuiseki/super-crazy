import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
//const Twitter = require('twit');
admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  /*
  const client = new Twitter({
      consumer_key: 'oYaba1q10k8ijD1vR5tncg',
      consumer_secret: '13AhPHJeIjzjeeOP6840LgsQRouslHtqdDlGU4LHTuw',
      access_token: '2158391-eWL3LmpmSO65pz8bS9BYG2fXNQO2QWdW5By04ysW19',
      access_token_secret: 'Z3Bst8LjRWHIWF2xwgHnCVeQMFpUdlDwzz7Wfs29ZRvxUx'
  });
  */
  const idToken = request.query.idToken
  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken: { uid: any; }) {
      let uid = decodedToken.uid;
      console.log("uid: "+uid);
      admin.auth().getUser(uid)
        .then(function(userRecord: any) {
          console.log('Successfully fetched user data:', userRecord.toJSON());
        })
        .catch(function(error: any) {
          console.log('Error fetching user data:', error);
        });
      response.send(uid);
    }).catch(function(error: any) {
      console.log(error)
    });
});

