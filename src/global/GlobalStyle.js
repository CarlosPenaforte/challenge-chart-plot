import { createGlobalStyle } from "styled-components";

// Formatting the body for correct fitting on screen
const GlobalStyle = createGlobalStyle`
  body{
    height:100vh;
    width:100vw;
    margin:0;
    padding:0;
  }
`

export default GlobalStyle;