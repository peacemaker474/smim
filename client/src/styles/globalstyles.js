import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color: #fff;
    cursor: default;
    -ms-overflow-style: none; 
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none; 
  }

  * {
    box-sizing: border-box;
  }
  
  ul {
    padding: 0;
    margin:0;
  }

  li {
    padding: 0;
    margin:0;
    list-style: none;
  }

  button {
    border : none;
    cursor : pointer;
    background : none;
  }
  
`;

export default GlobalStyle;
