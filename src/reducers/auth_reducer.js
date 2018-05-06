import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,

  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,

  IS_USER_LOGGED_IN,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAIL,
  LOGOUT,

  OAUTH_LOGIN,
  LOCAL_LOGIN,

} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  buttonLoading: false,
  screenLoading: false,

  userLoggedIn: null,
  userFacebook: null,
  userGoogle: null,
  userLocal: null,
};

export default function(state = INITIAL_STATE, action) {
    console.log('action in auth_reducer=', action);
    switch (action.type) {

      case IS_USER_LOGGED_IN:
        return { ...state, userLoggedIn: action.payload };
      case LOGOUT:
        return INITIAL_STATE;

      case OAUTH_LOGIN:
        return { ...state, screenLoading: true };
      case FACEBOOK_LOGIN_SUCCESS:
        return { ...state, userFacebook: action.payload, screenLoading: false};
      case FACEBOOK_LOGIN_FAIL:
        return { ...state, userFacebook: null, screenLoading: false };
      case GOOGLE_LOGIN_SUCCESS:
        return { ...state, userGoogle: action.payload, screenLoading: false};
      case GOOGLE_LOGIN_FAIL:
        return { ...state, userGoogle: null, screenLoading: false };

      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case LOCAL_LOGIN:
        return { ...state, buttonLoading: true, error: '' };
      case LOCAL_LOGIN_SUCCESS:
        return { ...state, userLocal: action.payload};
        // return { ...state, ...INITIAL_STATE, userLocal: action.payload, userLoggedIn: true };
      case LOCAL_LOGIN_FAIL:
        return { ...state, error: action.payload, password: '', buttonLoading: false };

      default:
        return state;
    }
}
