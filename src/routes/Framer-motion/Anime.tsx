import styled from "styled-components";
import Basic from "./Components/Basic";
import Advance from "./Components/Advance";
// import { motion } from "framer-motion";
import SvgImg from "./Components/SvgImg";
import Presence from "./Components/Presence";

const Wrapper = styled.div`
  height: 240vh;
  /* width: 100vw; */
  justify-content: center;
  align-items: center;
  display: grid;
  padding: 300px;
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-template-rows: 1fr; */
  gap: 1.25rem;
`;

function Anime() {
  return (
    <Wrapper>
      <SvgImg />
      <Basic />
      <Advance />
      <Presence />
    </Wrapper>
  );
}

export default Anime;
