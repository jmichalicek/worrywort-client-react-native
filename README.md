# Dev Setup

## Basic Setup
* Install NodeJS and React Native as appropriate for your OS
* git clone git@github.com:jmichalicek/worrywort-client-react-native.git worrywortclient
* cd worrywortclient
* yarn install
* react-native link react-native-config
* create .env with `API_URL` defined
* add `apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"``
  to android/app/build/gradle  (also do the iOS config).
* react-native run-android|run-ios

## Windows

If you want to run the WorryWort server in Docker for Windows alongside the client for development, you need Hyper-V enabled
which conflicts with Android Studio's emulator.  Microsoft provides an emulator which works with Hyper-V.  To use it, follow
the standard Windows React Native instructions and then:

* Find or create the following registry entry: HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools
* Add the key `Path` with value `c:\Users\USERNAME\AppData\Local\Android\sdk\platform-tools`

## Reaching a worrywort server from the android emulator

* Using the official android emulator, set API_URL in .env to http://10.0.2.2:4000/graphql/vi1/
* Using the visual studio android emulator on windows, to reach your local desktop,
  * set the API_URL to http://<WORRYWORT SERVER HOST>:<WORRYWORT SERVER PORT>/graphql/v1/ in .env
  * Add a new external network switch through the Hyper-V manager
  * After adding the external network switch, still using the Hyper-V manager, add a new network adapter to your emulator
    attached to the new external network switch.
  * If attempting to reach a local server such as if running WorryWort server in a local docker container
    then you may also need to open up port 4000 through windows firewall.  It is recommended that your
    host machine also run on a static IP to avoid needing to look it's IP up and update the API_URL in .env

### react-native-config
* https://medium.com/differential/managing-configuration-in-react-native-cd2dfb5e6f7b
* https://github.com/luggit/react-native-config
