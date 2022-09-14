import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { wrap } from "popmotion";

const Btn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border-width: 0;
  place-self: center;
  font-size: 16px;
`;

const Box = styled(motion.div)`
  width: 60px;
  height: 60px;
  background-color: rgb(254, 202, 87);
  border-radius: 20px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  text-align: center;
  line-height: 60px;
  color: rgb(0, 0, 0);
`;

const Circle = styled(motion.div)`
  background-color: rgb(254, 202, 87);
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
  width: 200px;
  height: 200px;
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
  entry: (direction: number) => ({
    x: direction > 0 ? 0 : 132,
    opacity: 0,
    scale: 0,
  }),
  center: {
    zIndex: 1,
    x: 66,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 0 : 132,
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
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const index = wrap(0, 4, page);

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
            >
              presence
            </Box>
          ) : null}
        </AnimatePresence>
      </Wrap>
      <Wrap>
        <Btn onClick={() => paginate(1)}>Next</Btn>
        <Btn onClick={() => paginate(-1)}>Prev</Btn>
        <AnimatePresence initial={false} custom={direction}>
          <Circle
            key={page}
            custom={direction}
            variants={circleVariants}
            initial="entry"
            animate="center"
            exit="exit"
          >
            {index}
          </Circle>
        </AnimatePresence>
      </Wrap>
    </>
  );
}

export default Presence;
