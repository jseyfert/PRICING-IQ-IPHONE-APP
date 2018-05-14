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

} from '../actions/types';

const INITIAL_STATE = {

  trackingItem: null,

  item: null,
  priceAmazon: null,
  priceThirdNew: null,
  priceThirdUsed: null,

  url_t: null,
  asin_t: null,
  priceAmazon_t: null,
  priceThirdNew_t: null,
  priceThirdUsed_t: null,

  appError: null,
};

export default function(state = INITIAL_STATE, action) {
    // console.log('APP_REDUCER=>', action);

    switch (action.type) {

      case ITEM_CHANGED:
        return { ...state, item: action.payload };
      case AMAZON_PRICE_CHANGED:
        return { ...state, priceAmazon: action.payload };
      case THIRD_PARTY_PRICE_NEW_CHANGED:
        return { ...state, priceThirdNew: action.payload };
      case THIRD_PARTY_PRICE_USED_CHANGED:
        return { ...state, priceThirdUsed: action.payload };

      case URL_TRACKED:
        return { ...state, url_t: action.payload };
      case ASIN_TRACKED:
        return { ...state, asin_t: action.payload };
      case AMAZON_PRICE_TRACKED:
        return { ...state, priceAmazon_t: action.payload };
      case THIRD_PARTY_PRICE_NEW_TRACKED:
        return { ...state, priceThirdNew_t: action.payload };
      case THIRD_PARTY_PRICE_USED_TRACKED:
        return { ...state, priceThirdUsed_t: action.payload };

      case TRACK_ITEM_ERROR:
        return { ...state, trackingItem: false, appError: action.payload, };
      case TRACK_ITEM_SUCCESS:
        return { ...state, trackingItem: true, appError: null };

      default:
        return state;

    }
}
