import {
  ITEM_CHANGED,
  AMAZON_PRICE_CHANGED,
  THIRD_PARTY_PRICE_NEW_CHANGED,
  THIRD_PARTY_PRICE_USED_CHANGED,

  URL_TRACKED,
  ASIN_TRACKED,
  AMAZON_PRICE_TRACKED,
  THIRD_PARTY_PRICE_NEW_TRACKED,
  THIRD_PARTY_PRICE_USED_TRACKED,

  TRACK_ITEM_SUCCESS,
  TRACK_ITEM_ERROR,

  REMOVE_ITEM_TRACKED,

  CLEAR_APP_STATE,

} from '../actions/types';

const INITIAL_STATE = {
  item_u: null,
  priceAmazon_u: null,
  priceThirdNew_u: null,
  priceThirdUsed_u: null,

  trackingItem: null,
  url: null,
  asin: null,
  priceAmazon: null,
  priceThirdNew: null,
  priceThirdUsed: null,

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

      case TRACK_ITEM_ERROR:
        return { ...state, trackingItem: false, appError: action.payload, };
      case TRACK_ITEM_SUCCESS:
        return { ...state, trackingItem: true, appError: null };

      case REMOVE_ITEM_TRACKED:
        return { ...INITIAL_STATE, trackingItem: false};

      case CLEAR_APP_STATE:
        return INITIAL_STATE;

      default:
        return state;

    }
}
