import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,

  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,

  IS_USER_LOGGED_IN,
  EMAIL_CHANGED,
  NEW_EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOCAL_LOGIN_SUCCESS,
  LOCAL_LOGIN_FAIL,
  LOCAL_PASSWORD_RESET,
  CLEAR_STATE,

  SCREEN_SPINNER,
  BUTTON_SPINNER,

  DELETE_ACCOUNT_ERROR,

  UPDATED_EMAIL_SUCCESS,
  UPDATED_EMAIL_ERROR,

} from '../actions/types';

const INITIAL_STATE = {
  newEmail: '',
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
      case CLEAR_STATE:
        return INITIAL_STATE;

      case SCREEN_SPINNER:
        return { ...state, screenLoading: true };
      case BUTTON_SPINNER:
        return { ...state, buttonLoading: true, error: '' };

      case FACEBOOK_LOGIN_SUCCESS:
        return { ...state, userLocal: action.payload, screenLoading: false};
      case FACEBOOK_LOGIN_FAIL:
        return { ...state, userLocal: null, error: action.payload, screenLoading: false };
      case GOOGLE_LOGIN_SUCCESS:
        return { ...state, userLocal: action.payload, screenLoading: false};
      case GOOGLE_LOGIN_FAIL:
        return { ...state, userLocal: null, screenLoading: false };

      case NEW_EMAIL_CHANGED:
        return { ...state, newEmail: action.payload };
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case LOCAL_LOGIN_SUCCESS:
        return { ...state, userLocal: action.payload};
      case LOCAL_LOGIN_FAIL:
        return { ...state, error: action.payload, password: '', buttonLoading: false };
      case LOCAL_PASSWORD_RESET:
        return { ...state, error: action.payload, password: '', email: '', buttonLoading: false };

      case DELETE_ACCOUNT_ERROR:
        return { ...state, error: action.payload, password: '', email: '', screenLoading: false };

      case UPDATED_EMAIL_SUCCESS:
        return { ...state, error: 'Email has been Updated', email: action.payload, newEmail: '', screenLoading: false };
      case UPDATED_EMAIL_ERROR:
        return { ...state, error: action.payload, newEmail: '', screenLoading: false };

      default:
        return state;
    }
}
