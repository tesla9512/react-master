import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

// const Wrapper = styled(motion.div)`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   flex-direction: column;
// `;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: repeat(2, 1fr); */
  grid-gap: 10px;
`;

const Box = styled(motion.div)`
  width: 90px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  line-height: 60px;
`;

function LayoutAnimation() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrap>
      <Box onClick={toggleClicked}>
        {!clicked ? (
          <Circle
            layoutId="circle"
            style={{ backgroundColor: "rgb(84, 160, 255)" }}
          >
            shared
          </Circle>
        ) : null}
      </Box>
      <Box onClick={toggleClicked}>
        {clicked ? (
          <Circle
            layoutId="circle"
            style={{ backgroundColor: "rgb(255, 159, 243)" }}
          >
            layout
          </Circle>
        ) : null}
      </Box>
    </Wrap>
  );
}

export default LayoutAnimation;
