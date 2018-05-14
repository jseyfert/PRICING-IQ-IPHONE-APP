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
} from '../actions/types';

const INITIAL_STATE = {
  user: undefined,
  email: '',
  newEmail: '',
  password: '',
  error: '',
  buttonLoading: false,
  screenLoading: false,
};

export default function(state = INITIAL_STATE, action) {
    console.log('reducer=>', action);
    switch (action.type) {

      case CLEAR_STATE:
        return INITIAL_STATE;
      case DELETE_ACCOUNT_ERROR:
        return { ...state, error: action.payload, password: '', newEmail: '', email: '', screenLoading: false };

      case SCREEN_SPINNER:
        return { ...state, screenLoading: true, error: '' };
      case BUTTON_SPINNER:
        return { ...state, buttonLoading: true, error: '' };

      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case PASSWORD_RESET:
        return { ...state, error: action.payload, password: '', email: '', buttonLoading: false };

      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case NEW_EMAIL_CHANGED:
        return { ...state, newEmail: action.payload };
      case UPDATED_EMAIL_SUCCESS:
        return { ...state, error: 'Email has been Updated', email: action.payload, newEmail: '', screenLoading: false };
      case UPDATED_EMAIL_ERROR:
        return { ...state, error: action.payload, newEmail: '', screenLoading: false };

      case LOGIN_SUCCESS:
        return { ...state, user: action.payload, screenLoading: false};
      case LOGIN_FAIL:
        return { ...state, user: null, error: action.payload, password: '', buttonLoading: false, screenLoading: false };

      default:
        return state;
    }
}

// case IS_USER_LOGGED_IN:
//   return { ...state, userLoggedIn: action.payload };
// case FACEBOOK_LOGIN_SUCCESS:
//   return { ...state, user: action.payload, screenLoading: false};
// case GOOGLE_LOGIN_SUCCESS:
//   return { ...state, user: action.payload, screenLoading: false};
// case FACEBOOK_LOGIN_FAIL:
//   return { ...state, user: null, error: action.payload, screenLoading: false };
// case GOOGLE_LOGIN_FAIL:
//   return { ...state, user: null, screenLoading: false };
