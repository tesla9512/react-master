import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const Item = styled.li`
  background-color: ${(props) => props.theme.windowColor};
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: bold;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    /* transition: color 0.2s ease-in; */
    text-transform: uppercase;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface IMenu {
  to: string;
  text: string;
}

function Menu({ to, text }: IMenu) {
  return (
    <Item>
      <Link to={to}>{text}</Link>
    </Item>
  );
}

const projects = [
  {
    to: "/coins",
    text: "coin tracker",
    key: 0,
  },
  {
    to: "/todo",
    text: "todo list",
    key: 1,
  },
  {
    to: "/kanban",
    text: "kanban",
    key: 2,
  },
  {
    to: "/anime",
    text: "anime",
    key: 3,
  },
];

function Main() {
  return (
    <Container>
      <Header>
        <HelmetProvider>
          <Helmet>
            <title>nomad react master</title>
          </Helmet>
        </HelmetProvider>
        <Header>
          <Title>NOMAD REACT MASTER</Title>
        </Header>
      </Header>
      <ul>
        {projects.map((menu) => (
          <Menu to={menu.to} text={menu.text} key={menu.key} />
        ))}
      </ul>
    </Container>
  );
}

export default Main;
