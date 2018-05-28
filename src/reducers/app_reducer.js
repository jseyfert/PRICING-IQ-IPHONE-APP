import {
  ITEM_CHANGED,
  AMAZON_PRICE_CHANGED,
  THIRD_PARTY_PRICE_NEW_CHANGED,
  THIRD_PARTY_PRICE_USED_CHANGED,
  EMAIL_NOTIFICATION_CHANGED,
  PUSH_NOTIFICATION_CHANGED,

  URL_TRACKED,
  ASIN_TRACKED,
  AMAZON_PRICE_TRACKED,
  THIRD_PARTY_PRICE_NEW_TRACKED,
  THIRD_PARTY_PRICE_USED_TRACKED,
  EMAIL_NOTIFICATION_TRACKED,
  PUSH_NOTIFICATION_TRACKED,

  TRACK_ITEM_SUCCESS,
  TRACK_ITEM_ERROR,

  ITEM_RESPONSE_SUCCESS,
  ITEM_RESPONSE_ERROR,
  REMOVE_ITEM_TRACKED,

  PRICE_RESPONSE,

  CLEAR_APP_STATE,

} from '../actions/types';

const INITIAL_STATE = {
  item_u: null,
  priceAmazon_u: null,
  priceThirdNew_u: null,
  priceThirdUsed_u: null,
  pushNotification_u: false,
  emailNotification_u: false,

  itemRequest: null,
  url: null,
  asin: null,
  priceAmazon: null,
  priceThirdNew: null,
  priceThirdUsed: null,
  pushNotification: null,
  emailNotification: null,

  itemResponse: null,
  priceResponse: null,

  appError: null,
};

export default function(state = INITIAL_STATE, action) {
    // console.log('APP_REDUCER=>', action);

    switch (action.type) {

      case ITEM_CHANGED:
        return { ...state, item_u: action.payload };
      case AMAZON_PRICE_CHANGED:
        return { ...state, priceAmazon_u: action.payload };
      case THIRD_PARTY_PRICE_NEW_CHANGED:
        return { ...state, priceThirdNew_u: action.payload };
      case THIRD_PARTY_PRICE_USED_CHANGED:
        return { ...state, priceThirdUsed_u: action.payload };
      case EMAIL_NOTIFICATION_CHANGED:
        return { ...state, emailNotification_u: action.payload};
      case PUSH_NOTIFICATION_CHANGED:
        return { ...state, pushNotification_u: action.payload};

      case URL_TRACKED:
        return { ...state, url: action.payload };
      case ASIN_TRACKED:
        return { ...state, asin: action.payload };
      case AMAZON_PRICE_TRACKED:
        return { ...state, priceAmazon: action.payload };
      case THIRD_PARTY_PRICE_NEW_TRACKED:
        return { ...state, priceThirdNew: action.payload };
      case THIRD_PARTY_PRICE_USED_TRACKED:
        return { ...state, priceThirdUsed: action.payload };
      case EMAIL_NOTIFICATION_TRACKED:
        return { ...state, emailNotification: action.payload };
      case PUSH_NOTIFICATION_TRACKED:
        return { ...state, pushNotification: action.payload };

      case TRACK_ITEM_SUCCESS:
        return { ...state, itemRequest: true, appError: null };
      case TRACK_ITEM_ERROR:
        return { ...state, itemRequest: false, appError: action.payload };

      case ITEM_RESPONSE_SUCCESS:
        return { ...state, itemResponse: true};
      case ITEM_RESPONSE_ERROR:
        return { ...state, itemResponse: false};

      case PRICE_RESPONSE:
        return { ...state, priceResponse: action.payload};

      case REMOVE_ITEM_TRACKED:
        return { ...INITIAL_STATE, itemRequest: false, itemResponse: false};
      case CLEAR_APP_STATE:
        return INITIAL_STATE;

      default:
        return state;

    }
}
