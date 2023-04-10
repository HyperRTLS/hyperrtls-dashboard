import React from 'react';

import { applyProps } from '@react-three/fiber';
import type { Instance } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { useGLTF } from '@react-three/drei';

type ModelMeshProps = {
  modelPath: string;
};

export default function ModelMesh({ modelPath }: ModelMeshProps) {
  const { scene } = useGLTF(modelPath, true);

  React.useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.type === 'Mesh')
        applyProps(obj as unknown as Instance, {
          castShadow: true,
          receiveShadow: true,
          'material-envMapIntensity': 0.3,
        });
    });
  }, [scene]);

  return <primitive object={scene} />;
}
