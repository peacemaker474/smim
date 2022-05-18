import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    width: 100vw;
    margin: 0;
    padding: 0;
    background-color: #fff;
    cursor: default;
    -ms-overflow-style: none; 
    scrollbar-width: none;
    /* font를 부드럽게 전환. 어두운 배경에서는 더 밝게 보이는 옵션 */
    -webkit-font-smoothing: antialiased;
    /* firefox 에서의 안티엘리어싱 */
    -moz-osx-font-smoothing: grayscale;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
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
  
  input,select{
    outline : none;
  }
  
  a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
