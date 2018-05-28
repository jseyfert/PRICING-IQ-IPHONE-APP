//fix SocketRocket: In debug mode.  Allowing connection to any root cert

import firebase from 'firebase';
import parseDomain from 'parse-domain';
import validator from 'validator';
import _ from 'lodash';

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
  REMOVE_ITEM_TRACKED,

  ITEM_RESPONSE_SUCCESS,
  ITEM_RESPONSE_ERROR,
  PRICE_RESPONSE,

  CLEAR_APP_STATE,
 } from './types'

 export const detailUrlChanged = (text) => {
   return {
     type: ITEM_CHANGED,
     payload: text
   };
 };

 export const amazonPriceChanged = (text) => {
   return {
     type: AMAZON_PRICE_CHANGED,
     payload: text
   };
 };

 export const thirdPartyNewChanged = (text) => {
   return {
     type: THIRD_PARTY_PRICE_NEW_CHANGED,
     payload: text
   };
 };

 export const thirdPartyUsedChanged = (text) => {
   return {
     type: THIRD_PARTY_PRICE_USED_CHANGED,
     payload: text
   };
 };

 export const emailNotificationsChange = (text) => {
   text = !text
   return {
     type: EMAIL_NOTIFICATION_CHANGED,
     payload: text
   };
 };

 export const pushNotificationsChange = (text) => {
   text = !text
   return {
     type: PUSH_NOTIFICATION_CHANGED,
     payload: text
   };
 };

export const removeItem = (user) => async dispatch => {
  let userId = firebase.auth().currentUser.uid;
  await firebase.database().ref('items/' + userId).remove()
  return dispatch({ type: REMOVE_ITEM_TRACKED });
}

export const isTrackingItem = () => async dispatch => {
  let userId = firebase.auth().currentUser.uid;
  var item = await firebase.database().ref('items/' + userId);
  item.on('value', function(snapshot) {
      if (snapshot.val()){
        let settings = snapshot.val().settings
        let request = snapshot.val().request
        let response = snapshot.val().response

        if (settings) {
          dispatch({ type: TRACK_ITEM_SUCCESS });
          dispatch({ type: EMAIL_NOTIFICATION_TRACKED, payload: settings.emailNotification });
          dispatch({ type: PUSH_NOTIFICATION_TRACKED, payload: settings.pushNotification });
        }

        if (request) {
          dispatch({ type: TRACK_ITEM_SUCCESS });
          dispatch({ type: URL_TRACKED, payload: request.url });
          dispatch({ type: ASIN_TRACKED, payload: request.asin });
          dispatch({ type: AMAZON_PRICE_TRACKED, payload: request.priceAmazon });
          dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: request.priceThirdNew });
          dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: request.priceThirdUsed });
        }

        if (response) {
          dispatch({ type: ITEM_RESPONSE_SUCCESS });
          dispatch({ type: PRICE_RESPONSE, payload: snapshot.val().response.price });
        } else {
          dispatch({ type: ITEM_RESPONSE_ERROR });
        }

      } else {
        dispatch({ type: TRACK_ITEM_ERROR, payload: null });
      }
  });

  // return firebase.database().ref('items/' + userId).on('value').then(function(snapshot) {
  //   if (snapshot.val()){
  //     console.log('snapshot.val()',snapshot.val());
  //
  //     dispatch({ type: TRACK_ITEM_SUCCESS });
  //     dispatch({ type: URL_TRACKED, payload: snapshot.val().request.url });
  //     dispatch({ type: ASIN_TRACKED, payload: snapshot.val().request.asin });
  //     dispatch({ type: AMAZON_PRICE_TRACKED, payload: snapshot.val().request.priceAmazon });
  //     dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: snapshot.val().request.priceThirdNew });
  //     dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: snapshot.val().request.priceThirdUsed });
  //
  //     dispatch({ type: EMAIL_NOTIFICATION_TRACKED, payload: snapshot.val().settings.emailNotification });
  //     dispatch({ type: PUSH_NOTIFICATION_TRACKED, payload: snapshot.val().settings.pushNotification });
  //
  //     dispatch({ type: PRICE_RESPONSE, payload: snapshot.val().response.price });
  //
  //   } else {
  //     dispatch({ type: TRACK_ITEM_ERROR, payload: null });
  //   }
  // });
}

export const changeTrackingButton = ({
  url, asin, priceAmazon, priceThirdNew, priceThirdUsed, pushNotification, emailNotification, user
}) => async dispatch => {
  dispatch({ type: REMOVE_ITEM_TRACKED });
  dispatch({ type: ITEM_CHANGED, payload: url ? url : asin });
  dispatch({ type: AMAZON_PRICE_CHANGED, payload: priceAmazon });
  dispatch({ type: THIRD_PARTY_PRICE_NEW_CHANGED, payload: priceThirdNew });
  dispatch({ type: THIRD_PARTY_PRICE_USED_CHANGED, payload: priceThirdUsed });
  dispatch({ type: EMAIL_NOTIFICATION_CHANGED, payload: emailNotification });
  dispatch({ type: PUSH_NOTIFICATION_CHANGED, payload: pushNotification });
}

export const startTrackingButton = ({
  item_u, priceAmazon_u, priceThirdNew_u, priceThirdUsed_u, pushNotification_u, emailNotification_u, user
}) => async dispatch => {

  item_u = _.trim(item_u)

  priceAmazon_u = _.trim(priceAmazon_u)
  priceAmazon_u = !priceAmazon_u ? null : priceAmazon_u

  priceThirdNew_u = _.trim(priceThirdNew_u)
  priceThirdNew_u = !priceThirdNew_u ? null : priceThirdNew_u

  priceThirdUsed_u = _.trim(priceThirdUsed_u)
  priceThirdUsed_u = !priceThirdUsed_u ? null : priceThirdUsed_u

  if (_.isEmpty(item_u)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }

  if (_.isEmpty(priceAmazon_u) && _.isEmpty(priceThirdNew_u) && _.isEmpty(priceThirdUsed_u)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'You must enter at least one price to track!' });
  }

  if ( !pushNotification_u && !emailNotification_u ) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'You must select at least one notification!' });
  }

  if ( _.isEmpty(priceAmazon_u) === false && isNaN(priceAmazon_u)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: 'Amazon price is not valid!' });
  }

  if ( _.isEmpty(priceThirdNew_u) === false && isNaN(priceThirdNew_u)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party New price is not valid!' });
  }

  if ( _.isEmpty(priceThirdUsed_u) === false && isNaN(priceThirdUsed_u)) {
    return dispatch({ type: TRACK_ITEM_ERROR, payload: '3rd Party Used price is not valid!' });
  }

  const isUrl = parseDomain(item_u);

  const re = /^\w{7,13}$/i;
  const isAsin = item_u.match(re);

  var currentUser = firebase.auth().currentUser
  var userId = currentUser.uid;
  var email = currentUser.email;

  if (isUrl) {
    const isAmazon = isUrl.domain === 'amazon'
    if (isAmazon) {
      firebase.database().ref('items/' + userId + '/request').set({
        url: item_u,
        asin: null,
        priceAmazon: priceAmazon_u,
        priceThirdNew: priceThirdNew_u,
        priceThirdUsed: priceThirdUsed_u,
      });
      firebase.database().ref('items/' + userId + '/settings').set({
        email: email,
        pushNotification: pushNotification_u,
        emailNotification: emailNotification_u,
      });
      dispatch({ type: TRACK_ITEM_SUCCESS });
      dispatch({ type: URL_TRACKED, payload: item_u });
      dispatch({ type: AMAZON_PRICE_TRACKED, payload: priceAmazon_u });
      dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: priceThirdNew_u });
      dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: priceThirdUsed_u });
      dispatch({ type: EMAIL_NOTIFICATION_TRACKED, payload: emailNotification_u });
      dispatch({ type: PUSH_NOTIFICATION_TRACKED, payload: pushNotification_u });

    } else {
      dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
    }
  } else if (isAsin) {
    firebase.database().ref('items/' + userId + '/request').set({
      url: null,
      asin: item_u,
      priceAmazon: priceAmazon_u,
      priceThirdNew: priceThirdNew_u,
      priceThirdUsed: priceThirdUsed_u,
    });
    firebase.database().ref('items/' + userId + '/settings').set({
      email: email,
      pushNotification: pushNotification_u,
      emailNotification: emailNotification_u,
    });
    dispatch({ type: TRACK_ITEM_SUCCESS });
    dispatch({ type: ASIN_TRACKED, payload: item_u });
    dispatch({ type: AMAZON_PRICE_TRACKED, payload: priceAmazon_u });
    dispatch({ type: THIRD_PARTY_PRICE_NEW_TRACKED, payload: priceThirdNew_u });
    dispatch({ type: THIRD_PARTY_PRICE_USED_TRACKED, payload: priceThirdUsed_u });
    dispatch({ type: EMAIL_NOTIFICATION_TRACKED, payload: emailNotification_u });
    dispatch({ type: PUSH_NOTIFICATION_TRACKED, payload: pushNotification_u });
  } else {
    dispatch({ type: TRACK_ITEM_ERROR, payload: 'Not a valid URL or ASIN' });
  }
}
