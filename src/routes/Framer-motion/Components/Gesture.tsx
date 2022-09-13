import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const GestureBox = styled(Box)`
  width: 160px;
  height: 160px;
  margin: 20px;
`;

const ConstraintsBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  overflow: hidden;
`;

const DragCircle = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const gestureVariants = {
  hover: { scale: 1.25, rotateZ: 90, backgroundColor: "rgb(254, 202, 87)" },
  click: { scale: 1, borderRadius: "100px" },
};

const dragVariants = {
  // drag: {
  //   scale: 0.85,
  // },
  click: { backgroundColor: "rgb(254, 202, 87)" },
};

function Gesture() {
  const constraintBoxA = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const scaleX = useTransform(x, [-75, 0, 75], [0.6, 1, 0.6]);
  return (
    <>
      <GestureBox
        variants={gestureVariants}
        whileHover="hover"
        whileTap="click"
      />
      <ConstraintsBox ref={constraintBoxA}>
        <DragCircle
          style={{ x, scale: scaleX }}
          drag="x"
          variants={dragVariants}
          dragSnapToOrigin
          dragElastic={0.1}
          dragConstraints={constraintBoxA}
          // whileDrag="drag"
          whileTap="click"
        />
      </ConstraintsBox>
    </>
  );
}

export default Gesture;
