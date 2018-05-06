import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const { LoginManager, GraphRequest, GraphRequestManager, AccessToken } = FBSDK;

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOCAL_LOGIN,
  OAUTH_LOGIN,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAIL,
  IS_USER_LOGGED_IN,
  LOGOUT,
 } from './types'

 export const isUserLoggedIn = () => async dispatch => {

   // let userFacebook = await AccessToken.getCurrentAccessToken()
   // if (userFacebook) {
   //   dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: userFacebook});
   // }
   //
   // let userGoogle = await GoogleSignin.currentUserAsync()
   // if (userGoogle) {
   //   dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: userGoogle});
   // }
   //
   // let userLocalPromise = new Promise((resolve, reject) => {
   //   firebase.auth().onAuthStateChanged((user) => {
   //     if (user) {
   //       resolve(user)
   //       localLoginSuccess(dispatch, user)
   //     } else {
   //       resolve(null)
   //     }
   //   });
   // });
   // let userLocal = await userLocalPromise;
   //
   // let userLoggedIn = ( userFacebook || userLocal || userGoogle ) ? true : false;
   // dispatch({ type: IS_USER_LOGGED_IN, payload: userLoggedIn});

   let userLocalPromise = new Promise((resolve, reject) => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         resolve(user)
         localLoginSuccess(dispatch, user)
       } else {
         resolve(null)
       }
     });
   });
   let userLocal = await userLocalPromise;

   let userLoggedIn = userLocal ? true : false;
   dispatch({ type: IS_USER_LOGGED_IN, payload: userLoggedIn});
 }

 export const googleLogin = () => async dispatch => {
    try {
      dispatch({ type: OAUTH_LOGIN });
      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: user});
      dispatch({ type: IS_USER_LOGGED_IN, payload: true});
    } catch (e) {
      dispatch({ type: GOOGLE_LOGIN_FAIL});
      // dispatch({ type: IS_USER_LOGGED_IN, payload: false});
      console.log(e);
    }
 }


export const facebookLogin = () => async dispatch => {
  try {
    dispatch({ type: OAUTH_LOGIN });
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      dispatch({ type: FACEBOOK_LOGIN_FAIL});
      // dispatch({ type: IS_USER_LOGGED_IN, payload: false});
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      dispatch({ type: FACEBOOK_LOGIN_FAIL});
      // dispatch({ type: IS_USER_LOGGED_IN, payload: false});
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: user });
    dispatch({ type: IS_USER_LOGGED_IN, payload: true});
  } catch (e) {
    // !!!fix error when i signin to facebook and it also sign me in to firebase
    console.log(e);
    dispatch({ type: FACEBOOK_LOGIN_FAIL});
  }
}

// export const localLogin = ({ email, password }) => async dispatch => {
//   try {
//     console.log('in try one');
//     dispatch({ type: LOCAL_LOGIN });
//
//     const user = await firebase.auth().signInWithEmailAndPassword(email, password);
//
//     dispatch({ type: LOCAL_LOGIN_SUCCESS, payload: user });
//     dispatch({ type: IS_USER_LOGGED_IN, payload: true});
//
//   } catch (error) {
//     try {
//       console.log('in try two');
//       const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
//       dispatch({ type: LOCAL_LOGIN_SUCCESS, payload: user });
//       dispatch({ type: IS_USER_LOGGED_IN, payload: true});
//     } catch (error)  {
//       console.log('in catch two');
//       dispatch({ type: LOCAL_LOGIN_FAIL, payload: error.message, });
//     }
//     // console.log('in catch one');
//     // console.log(error);
//     // dispatch({ type: LOCAL_LOGIN_FAIL, payload: error.message, });
//   }
// }

export const localLogin = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOCAL_LOGIN });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => localLoginSuccess(dispatch, user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => localLoginSuccess(dispatch, user))
          .catch(error => localLoginFail(dispatch, error));
    });
  };
};

// const localLoginEmailInUse = async (email) => {
//   let test = await firebase.auth().fetchProvidersForEmail(email)
//   console.log('test===', test);
// };

const localLoginFail = (dispatch, error) => {
  console.log('error', error);
  dispatch({ type: LOCAL_LOGIN_FAIL, payload: error.message, });
};

const localLoginSuccess = (dispatch, user) => {
  dispatch({ type: LOCAL_LOGIN_SUCCESS, payload: user });
  dispatch({ type: IS_USER_LOGGED_IN, payload: true});
};


 //
 // export const facebookLogin = () => async dispatch => {
 //
 //   let userFacebook = await AccessToken.getCurrentAccessToken()
 //
 //   if (userFacebook) {
 //     dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: userFacebook });
 //   } else {
 //     doFacebookLogin(dispatch);
 //   }
 // }
 //
 // const doFacebookLogin = async dispatch => {
 //
 //   dispatch({ type: OAUTH_LOGIN });
 //
 //   let result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
 //
 //   if (result.isCancelled) {
 //     return dispatch({ type: FACEBOOK_LOGIN_FAIL})
 //   }
 //   dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: result});
 //   // dispatch({ type: IS_USER_LOGGED_IN, payload: true});
 // }


export const googleLogout = () => {
  GoogleSignin.signOut()
  return { type: LOGOUT };
};

export const facebookLogout = () => {
  LoginManager.logOut()
  return { type: LOGOUT };
};

export const localLogout = () => async dispatch => {
  firebase.auth().signOut().then(function() {
    dispatch({ type: LOGOUT});
  }).catch(function(error) {
    console.log(error);
  });
}


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
