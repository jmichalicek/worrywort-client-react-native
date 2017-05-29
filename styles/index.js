import NativeTachyons from 'react-native-style-tachyons';
import { StyleSheet } from 'react-native';

export const colorPalette = {
  colors: {
    palette: {
      red: "#FF0000",
      green: "#008000",
      white: "#FFFFFF",
      gray: "#808080",
      black: "#000000",
      darkGrey: "#a9a9a9",
      darkGray: "#a9a9a9",
      dimgrey: "#696969",
      greenYellow: "#ADFF2F",
      yellowGreen: "#9ACD32"
    }
  }
}

// Can this go into colors?
NativeTachyons.build({...colorPalette
    /* REM parameter is optional, default is 16 */
    // rem: screenWidth > 340 ? 18 : 16
}, StyleSheet);
