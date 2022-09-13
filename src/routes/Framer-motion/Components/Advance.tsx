import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
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

const ScrollCircle = styled(Box)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const gestureVariants = {
  hover: { scale: 1.25, rotateZ: 90, backgroundColor: "rgb(254, 202, 87)" },
  click: { scale: 1, borderRadius: "100px", transition: { duration: 0.15 } },
};

const dragVariants = {
  // drag: {
  //   scale: 0.85,
  // },
  click: { backgroundColor: "rgb(254, 202, 87)" },
};

function Advance() {
  const constraintBoxA = useRef<HTMLDivElement>(null);
  const constraintBoxB = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const scaleX = useTransform(x, [-75, 0, 75], [0.6, 1, 0.6]);
  const { scrollY } = useScroll();
  const scaleY = useTransform(scrollY, [0, 777, 1554], [0.8, 2, 0.8]);
  const colorY = useTransform(
    scrollY,
    [0, 540, 1080],
    ["rgb(255, 255, 255)", "rgb(254, 202, 87)", "rgb(255, 255, 255)"]
  );

  // useEffect(() => {
  //   return scrollY.onChange((latest) => {
  //     console.log("Page scroll: ", latest);
  //   });
  // }, []);

  return (
    <>
      <ConstraintsBox ref={constraintBoxB}>
        <ScrollCircle style={{ scale: scaleY, backgroundColor: colorY }} />
      </ConstraintsBox>
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

export default Advance;
