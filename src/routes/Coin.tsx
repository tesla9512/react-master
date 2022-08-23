import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
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
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteState {
  coinId: string;
}

interface LocationState {
  state: string;
}

function Coins() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state: name } = useLocation() as LocationState;

  return (
    <Container>
      <Header>
        <Title>{name ?? "Loading"}</Title>
      </Header>
      {loading ? <Loader>Now Loading...</Loader> : null}
    </Container>
  );
}

export default Coins;
