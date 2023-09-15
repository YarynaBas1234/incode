import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    #root {
        height: 100%;
    }

    body {
        width: 100%;
        height: 100%;
        font-family: "Roboto", sans-serif;
        font-weight: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        &::-webkit-scrollbar-track  {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            border-radius: 10px;
            background-color: #272B3399;
        }

        &::-webkit-scrollbar  {
            width: 12px;
            background-color: #272B3399;
        }

        &::-webkit-scrollbar-thumb  {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color:  #F5F5F5;
        }
    }
    * {
        padding: 0;
        margin: 0;
        word-wrap: break-word;
        outline: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    button {
        padding: 0;
        color: inherit;
        cursor: pointer;
        background-color: transparent;
        border-width: 0;
    }

    figure {
        margin: 0;
    }

    ul,
    ol,
    dd {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    ol {
        list-style-position: inside;
        list-style-type: decimal;

        li + li {
            margin-top: 8px;
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0;
        font-size: inherit;
    }

    cite {
        font-style: normal;
    }

    fieldset {
        padding: 0;
        margin: 0;
        border-width: 0;
    }

    input[type='search']::-ms-clear {
        display: none;
        width: 0;
        height: 0;
    }

    input[type='search']::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
    }

    input {
        background-color: transparent;
        border: 0;
        appearance: none;
    }

    input::-moz-focus-inner {
        padding: 0;
        margin: 0;
        border: 0;
    }

    img {
        display: block;
        max-width: 100%;
        border: 0;
    }
`;
