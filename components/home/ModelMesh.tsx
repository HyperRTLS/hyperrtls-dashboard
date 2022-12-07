import React from 'react';

import { applyProps } from '@react-three/fiber';
import { Instance } from '@react-three/fiber/dist/declarations/src/core/renderer';
import { useGLTF } from '@react-three/drei';

function ModelMesh() {
  const { scene } = useGLTF('../room.glb', true);

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

export default ModelMesh;
