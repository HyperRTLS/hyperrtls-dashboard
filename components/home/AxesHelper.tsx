import React from 'react';

import { Vector3 } from 'three';

const arrowAnchorPoint = new Vector3(0, 0, 0);
const arrowLength = 3;
const arrowHeadLength = 0.2;

function AxesHelper() {
  return (
    <>
      <arrowHelper
        args={[
          new Vector3(1, 0, 0),
          arrowAnchorPoint,
          arrowLength,
          0xff0000,
          arrowHeadLength,
        ]}
      />

      <arrowHelper
        args={[
          new Vector3(0, 1, 0),
          arrowAnchorPoint,
          arrowLength,
          0x00ff00,
          arrowHeadLength,
        ]}
      />

      <arrowHelper
        args={[
          new Vector3(0, 0, 1),
          arrowAnchorPoint,
          arrowLength,
          0x0000ff,
          arrowHeadLength,
        ]}
      />
    </>
  );
}

export default React.memo(AxesHelper);
