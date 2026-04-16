import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import { useRef } from "react";

const Backdrop = () => {
  const shadows = useRef();

  useFrame((state, delta) => {
    easing.dampC(
      shadows.current.getMesh().material.color,
      "yellow",
      0.25,
      delta
    );
  });

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={30}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      color="#000000"
      opacity={40}
    >
      <RandomizedLight
        castShadows
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
        bias={-0.001}
        // bias={10}
      />
      <RandomizedLight
        castShadows
        amount={4}
        radius={9}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
        bias={-0.001}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
