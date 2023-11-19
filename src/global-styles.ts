import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
:root {
  --color-main-bg: #222222;
}

*,
*::before,
&::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-family: sans-serif;
  line-height: 1;
  background-color: var(--color-main-bg);
  color: #fff;
}

img, canvas {
  max-width: 100%;
  height: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

button {
  border: none;
  outline: none;
}

.activeZone {
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 90%;
    height: 56vh;
    margin: 0 auto;
    background-color: rgba(54, 21, 21, .7);
    display: block;
    content: "";
  }
}
`;

export default GlobalStyles;
