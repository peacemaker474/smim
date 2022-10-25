import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'MaruBuri-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/MaruBuri-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
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
    font-family: 'MaruBuri-Regular';
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
    font-family: 'MaruBuri-Regular';
  }
  
  input,select,textarea {
    outline : none;
    font-family: 'MaruBuri-Regular';
  }
  input::placeholder {
    font-family: 'MaruBuri-Regular';
  }
  
  textarea::placeholder {
   font-family: 'MaruBuri-Regular';
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
