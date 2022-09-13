import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Btn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border-width: 0;
  place-self: center;
  font-size: 20px;
`;

const Box = styled(motion.div)`
  width: 60px;
  height: 60px;
  background-color: rgb(254, 202, 87);
  border-radius: 20px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  height: 60px;
  width: 60px;
  border-radius: 30px;
  font-size: 20px;
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: repeat(2, 1fr); */
`;

const boxVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
};

const circleVariants = {
  entry: (isBack: boolean) => ({
    x: isBack ? 0 : 132,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 66,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => ({
    x: isBack ? 132 : 0,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

function Presence() {
  const [showing, setShowing] = useState(false);
  const boom = () => setShowing(true);
  const bye = () => setShowing(false);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const viewNext = () => {
    setBack(false);
    setVisible((prev) => (prev === 3 ? 1 : prev + 1));
  };
  const viewPrev = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 3 : prev - 1));
  };

  return (
    <>
      <Wrap>
        <Btn onClick={boom}>Boom</Btn>
        <Btn onClick={bye}>Bye</Btn>
        <AnimatePresence>
          {showing ? (
            <Box
              variants={boxVariants}
              initial="initial"
              animate="visible"
              exit="leaving"
            />
          ) : null}
        </AnimatePresence>
      </Wrap>
      <Wrap>
        <Btn onClick={viewNext}>Next</Btn>
        <Btn onClick={viewPrev}>Prev</Btn>
        <AnimatePresence custom={back}>
          <Circle
            key={visible}
            custom={back}
            variants={circleVariants}
            initial="entry"
            animate="center"
            exit="exit"
          >
            {visible}
          </Circle>
        </AnimatePresence>
      </Wrap>
    </>
  );
}

export default Presence;
