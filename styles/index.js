import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

export const colorPalette = {
  colors: {
    palette: {
      red: "#FF0000",
      green: "#008000",
      white: "#FFFFFF",
      gray: "#808080"
    }
  }
}

// Can this go into colors?
NativeTachyons.build({...colorPalette
    /* REM parameter is optional, default is 16 */
    // rem: screenWidth > 340 ? 18 : 16
}, StyleSheet);
