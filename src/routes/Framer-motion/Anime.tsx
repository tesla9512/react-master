import styled from "styled-components";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Basic from "./Components/Basic";
import Gesture from "./Components/Gesture";

const Wrapper = styled.div`
  height: 200vh;
  /* width: 100vw; */
  justify-content: center;
  align-items: center;
  display: grid;
  padding: 300px;
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-template-rows: 1fr; */
  /* gap: 1.25rem; */
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ConstraintsBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
`;

const ScrollCircle = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

function Anime() {
  const constraintBoxB = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scaleY = useTransform(scrollY, [0, 540, 1080], [0.8, 2, 0.8]);
  const colorY = useTransform(
    scrollY,
    [0, 540, 1080],
    ["rgb(255, 255, 255)", "rgb(254, 202, 87)", "rgb(255, 255, 255)"]
  );

  return (
    <Wrapper>
      <Basic />
      <ConstraintsBox ref={constraintBoxB}>
        <ScrollCircle style={{ scale: scaleY, backgroundColor: colorY }} />
      </ConstraintsBox>
      <Gesture />
    </Wrapper>
  );
}

export default Anime;
