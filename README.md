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


### react-native-config
* https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b
* https://github.com/luggit/react-native-config
