import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      yellow: string;
      red: string;
      navy: string;
      gray: string;
      lightGray: string;
      black: string;
      darkGray: string;
    },
  
    tagColor: {
      yellow: string;
    },
  
    device: {
      webMiddle: string;
      ipad: string;
      mobileMiddle: string;
      mobile: string;
      iphoneSE: string;
      fold: string;
    },
  }
}