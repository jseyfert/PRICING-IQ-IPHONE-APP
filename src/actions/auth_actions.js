//fix test cancel on google login

import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { GoogleSignin } from 'react-native-google-signin';
const FBSDK = require('react-native-fbsdk');
const { LoginManager, GraphRequest, GraphRequestManager, AccessToken } = FBSDK;


import {
  CLEAR_STATE,
  DELETE_ACCOUNT_ERROR,

  SCREEN_SPINNER,
  BUTTON_SPINNER,

  PASSWORD_RESET,
  PASSWORD_CHANGED,

  EMAIL_CHANGED,
  NEW_EMAIL_CHANGED,
  UPDATED_EMAIL_SUCCESS,
  UPDATED_EMAIL_ERROR,

  LOGIN_SUCCESS,
  LOGIN_FAIL,
 } from './types'

 export const isUserLoggedIn = () => async dispatch => {
   firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({ type: LOGIN_SUCCESS, payload: user });
      } else {
        dispatch({ type: LOGIN_FAIL, payload: '' });
      }
    });
 }

 export const googleLogin = () => async dispatch => {
    try {
      dispatch({ type: SCREEN_SPINNER });
      const data = await GoogleSignin.signIn();

      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

      const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      dispatch({ type: LOGIN_SUCCESS, payload: user.user});
    } catch (e) {
      //fix what happends when google login gets Cancelled
      console.log(e);
      dispatch({ type: LOGIN_FAIL, payload: 'google login fail'});
    }
 }

export const facebookLogin = () => async dispatch => {
  try {
    dispatch({ type: SCREEN_SPINNER });
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      dispatch({ type: LOGIN_FAIL, payload: 'Cancelled'});
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        dispatch({ type: LOGIN_FAIL, payload: 'Access Token Error'});
      } else {
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        const user = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

        dispatch({ type: LOGIN_SUCCESS, payload: user.user });
      }
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: LOGIN_FAIL, payload: e.message});
  }
}

export const localLogin = ({ email, password }) => async dispatch => {
  try {
    dispatch({ type: BUTTON_SPINNER });

    const user = await firebase.auth().signInWithEmailAndPassword(email, password);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOGIN_FAIL, payload: e.message });
  }
}


export const localSignUp = ({ email, password }) => async dispatch => {
  try {
    dispatch({ type: BUTTON_SPINNER });

    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOGIN_FAIL, payload: e.message, });
  }
}


export const localPasswordReset = ({ email }) => async dispatch => {
  try {
    dispatch({ type: BUTTON_SPINNER });

    const user = await firebase.auth().sendPasswordResetEmail(email);

    dispatch({ type: PASSWORD_RESET, payload: 'Check your email' });
  } catch (e) {
    console.log(e);
    dispatch({ type: LOGIN_FAIL, payload: e.message });
  }
}

export const localDeleteAccount = () => async dispatch => {
  try {
    dispatch({ type: SCREEN_SPINNER });

    var user = await firebase.auth().currentUser;
    await user.delete()

    dispatch({ type: CLEAR_STATE});
    alert('User has been deleted!')
  } catch (e) {
    dispatch({ type: DELETE_ACCOUNT_ERROR, payload: e.message });
  }
}

export const localChangeEmail = ({ newEmail }) => async dispatch => {
  try {
    dispatch({ type: SCREEN_SPINNER });

    let user = await firebase.auth().currentUser;
    await user.updateEmail(newEmail)

    dispatch({ type: UPDATED_EMAIL_SUCCESS, payload: newEmail });
  } catch (e) {
    dispatch({ type: UPDATED_EMAIL_ERROR, payload: e.message });
  }
}

export const localLogout = () => async dispatch => {
  firebase.auth().signOut().then(function() {
    dispatch({ type: CLEAR_STATE});
  }).catch(function(error) {
    alert(error);
  });
}

export const newEmailChanged = (text) => {
  return {
    type: NEW_EMAIL_CHANGED,
    payload: text
  };
};

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


///////// OLD CODE //////////
// export const isUserLoggedIn = () => async dispatch => {
//   let userFacebook = await AccessToken.getCurrentAccessToken()
//   if (userFacebook) {
//     dispatch({ type: LOGIN_SUCCESS, payload: userFacebook});
//   }
//
//   let userGoogle = await GoogleSignin.currentUserAsync()
//   if (userGoogle) {
//     dispatch({ type: LOGIN_SUCCESS, payload: userGoogle});
//   }
//
//   let userLocalPromise = new Promise((resolve, reject) => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         resolve(user)
//         localLoginSuccess(dispatch, user)
//       } else {
//         resolve(null)
//       }
//     });
//   });
//   let userLocal = await userLocalPromise;
//
//   let userLoggedIn = ( userFacebook || userLocal || userGoogle ) ? true : false;
// }


// export const googleLogout = () => {
//   GoogleSignin.signOut()
//   return { type: CLEAR_STATE };
// };
//
// export const facebookLogout = () => {
//   LoginManager.logOut()
//   return { type: CLEAR_STATE };
// };
