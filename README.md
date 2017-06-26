# Dev Setup

* yarn install
* react-native link react-native-config
* create .env with `API_URL` defined
* add `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"``
  to android/app/build/gradle  (also do the iOS config).
* react-native run-android|run-ios

## Windows

If you want to run the WorryWort server in docker for windows, you need Hyper-V enabled
which conflicts with Android Studio's emulator.  Microsoft provides an emulator which works
with Hyper-V.  To use it, follow the standard Windows react-native instructions and then

* Edit the following registry entry (which may need created first): HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools
* Add c:\Users\USERNAME\AppData\Local\Android\sdk\platform-tools to your path

## Reaching a worrywort server from the android emulator
Using the official android emulator, set API_URL in .env to http://10.0.2.2:4000/graphql/vi1/

Using the visual studio android emulator on windows, to reach your local desktop,
set the API_URL to http://10.0.75.1:4000/graphql/v1/
# TODO: add network adapter via hyper-v config?
API_URL=http://169.254.80.80:4000/graphql/v1/
API_URL=http://192.168.1.5:4000/graphql/v1/

### react-native-config
* https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b
* https://github.com/luggit/react-native-config
