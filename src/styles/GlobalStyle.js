import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* other styles */
  :root {
    --background-color: #ffffff;
    --perspective: 2000px;
    
    /* Primary Colors (Pink) */
    --primary-10: rgb(254, 239, 242);  /* rgb(254, 239, 242) */
    --primary-20: rgb(253, 230, 236);  /* rgb(253, 230, 236) */
    --primary-30: rgb(250, 204, 215);  /* rgb(250, 204, 215) */
    --primary-40: rgb(245, 126, 154);  /* rgb(245, 126, 154) */
    --primary-50: rgb(240, 90, 126);   /* rgb(240, 90, 126) */
    --primary-60: rgb(216, 81, 113);   /* rgb(216, 81, 113) */
    --primary-70: rgb(192, 72, 100);   /* rgb(192, 72, 100) */
    --primary-80: rgb(144, 54, 75);    /* rgb(144, 54, 75) */
    --primary-90: rgb(108, 40, 56);    /* rgb(108, 40, 56) */

    /* Gray Scale */
    --gray-0: rgb(255, 255, 255);    /* White */
    --gray-10: rgb(241, 241, 241);   /* rgb(241, 241, 241) */
    --gray-20: rgb(221, 221, 221);   /* rgb(221, 221, 221) */
    --gray-30: rgb(206, 206, 206);   /* rgb(206, 206, 206) */
    --gray-40: rgb(185, 185, 185);   /* rgb(185, 185, 185) */
    --gray-50: rgb(146, 146, 146);   /* rgb(146, 146, 146) */
    --gray-60: rgb(95, 95, 95);      /* rgb(95, 95, 95) */
    --gray-70: rgb(80, 80, 80);      /* rgb(80, 80, 80) */
    --gray-80: rgb(51, 51, 51);      /* rgb(51, 51, 51) */
    --gray-90: rgb(28, 28, 30);      /* rgb(28, 28, 30) */

    /* Semantic Colors */
    --text-primary: var(--gray-90);
    --text-secondary: var(--gray-80);
    --background-primary: var(--gray-0);
    --background-secondary: var(--gray-10);
    --hover-color: var(--primary-50);
    --border-color: var(--gray-70);

    /* font styles */
    --font-primary: "nanumgothic", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    --font-secondary: "nanummyeongjo", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;"
    --font-size-root: 10px;
    --font-size-base: 1.0rem;

    /* font-size */
    --font-title-xs: 56px;
    --font-title-s: 64px;
    --font-title-m: 72px;
    --font-title-l: 90px;
    --font-title-xl: 120px;
    --font-heading-m: 17px;
    --font-content-s: 16px;
    --font-content-m: 17px;
    --font-content-l: 20px;
    --font-content-xl: 24px;
    --font-content-xxl: 26px;
    --font-content-xxxl: 36px;
    --font-label-xs:12px;
    --font-label-s: 14px;
    --font-label-m: 20px;
    --font-label-l: 24px;
    --font-footer-m: 2.0rem;

    --font-title-m-tablet: 48px;
    --font-heading-m-tablet: 17px;
    --font-content-m-tablet: 16px;
    --font-content-xxl-tablet: 24px;
    --font-label-m-tablet: 12px;
    --font-label-xl-tablet: 14px;
    --font-footer-m-tablet: 12px;

    --font-title-m-mobile: 30px;
    --font-heading-m-mobile: 15px;
    --font-content-m-mobile: 14px;
    --font-content-l-mobile: 16px;
    --font-content-xxl-mobile: 20px;
    --font-label-m-mobile: 7px;
    --font-label-xl-mobile: 14px;
    --font-footer-m-mobile: 10px;

    /* font-weight */
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;


    /* line-hieght */
    --line-height-base: 1.2;



  }
  

  //reset
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: var(--font-size-root);
	font: inherit;
	vertical-align: baseline;
}
  html{
  font-size: var(--font-size-root);
  box-sizing: border-box;
  }
  body {
    font-size: 16px;
    line-height: 1.2;
    font-family: var(--font-primary);
    color:var(--gray-0);
    background-color: var(--background-color);
    -webkit-overflow-scrolling: touch;
  }
  *:before,
  *:after {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color:var(--gray-0);
  }
  ol,li { list-style:none }
  img { vertical-align: top; border: 0; }
  select {
    border: 0;
    background: none;
    appearance: none;
    &:focus {
      outline: none;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }
  input,
  button,
  textarea {
    font-family: inherit;
    border: 0;
    background-color: transparent;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


  
  .inner { width:1400px; margin:auto; box-sizing:border-box; position:relative; padding:120px 0; }
  .main { width: 100%; }

  button { border:none; cursor: pointer; }
  .hide{
    overflow: hidden;
    text-indent: -99999px;
    width: 0;
    height: 0;
    font-size: 0;
    line-height: 0;
  }

`;

export default GlobalStyle;