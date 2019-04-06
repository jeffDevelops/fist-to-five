import { createGlobalStyle  } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /* System Font Family */
  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
  }

  html {
    background-color: rgba(15, 198, 230, 1); /* Trilogy website's primary color */
  }

  html, html * {
    box-sizing: border-box;
    color: #2a2a2a;
    font-family: "system";
    letter-spacing: .05em;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    font-size: 18px;
    background: rgb(46, 229, 248); /* fallback */
    background-image: radial-gradient(circle, rgba(46,229,248,1), rgba(56, 188, 219, 1));
  }
`;

export default GlobalStyles;