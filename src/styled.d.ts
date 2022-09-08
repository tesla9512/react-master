// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    asymColor: string;
    accentColor: string;
    hoverColor: string;
    windowColor: string;
    boardColorBase: string;
    boardColorFrom: string;
    boardColorTo: string;
  }
}
