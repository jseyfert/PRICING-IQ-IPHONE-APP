# react-native-authentication-stater

curl -X PUT -d '{ "price": "33" }' \
'https://frigginyeah-ca94d.firebaseio.com/items/SXVqWWsfPrbDftOBOMQWsyFdunG3/response.json'



To update firebase cloud functions(we use this to send emails):
- to change un/pw execute this in terminal
'firebase functions:config:set gmail.email="<email>" gmail.password="<password>"'
- alter file FrigginYeah/functions/index.js
- in terminal execute 'firebase deploy --only functions'




when moving over to toms app developer account:
for push nutifications - https://medium.com/flawless-app-stories/ios-remote-push-notifications-in-a-nutshell-d05f5ccac252
