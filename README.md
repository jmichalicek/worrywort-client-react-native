# Dev Setup

* yarn install
* react-native link react-native-config
* create .env with `API_URL` defined
* add `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"``
  to android/app/build/gradle  (also do the iOS config).
* react-native run-android|run-ios

### react-native-config
* https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b
* https://github.com/luggit/react-native-config
