import styled from "styled-components";
import Basic from "./Components/Basic";
import Advance from "./Components/Advance";
// import { motion } from "framer-motion";
import SvgImg from "./Components/SvgImg";
import Presence from "./Components/Presence";
import LayoutAnimation from "./Components/LayoutAnimation";
import LastOne from "./Components/LastOne";

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  padding: 200px;
`;

const WrapperB = styled.div`
  height: 100vh;
  /* width: 100vw; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Anime() {
  return (
    <>
      <Wrapper>
        <SvgImg />
        <Basic />
        <Advance />
        <LayoutAnimation />
        <Presence />
      </Wrapper>
      <WrapperB>
        <LastOne />
      </WrapperB>
    </>
  );
}

export default Anime;
