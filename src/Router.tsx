import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { mainTheme, subTheme } from "./theme";
import { isDarkAtom } from "./atoms";
import Main from "./routes/Main";
import Coin from "./routes/crypto-tracker/Coin";
import Coins from "./routes/crypto-tracker/Coins";
import Price from "./routes/crypto-tracker/Price";
import Chart from "./routes/crypto-tracker/Chart";
import TodoList from "./routes/todo-list/TodoList";
import Kanban from "./routes/trello/Kanban";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
  box-sizing: border-box;
}
body { //폰트 적용
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const ToggleButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  font-size: 36px;
  padding-bottom: 6px;
  margin: 8px;
  position: absolute;
  background-color: ${(props) => props.theme.asymColor};
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }
`;

const HomeButton = styled(ToggleButton)`
  padding: 4px 8px 8px 8px;
  top: 72px;
  a {
    cursor: default;
  }
`;

function Router() {
  const [isDark, setMode] = useRecoilState(isDarkAtom);

  const toggleTheme = () => {
    const mode = !isDark;
    setMode(mode);
    localStorage.setItem("dark-mode", JSON.stringify(mode));
  };

  useEffect(() => {
    setMode(localStorage.getItem("dark-mode") === "true");
  }, [setMode]);

  return (
    <ThemeProvider theme={isDark ? mainTheme : subTheme}>
      <GlobalStyle />

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ToggleButton onClick={toggleTheme}>
          {isDark ? "🌞" : "🌙"}
        </ToggleButton>
        <HomeButton>
          <Link to="/">🏠</Link>
        </HomeButton>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/:coinId/" element={<Coin />}>
            <Route path="price" element={<Price />} />
            <Route path="chart" element={<Chart />} />
          </Route>
          <Route path="/todo" element={<TodoList />} />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
