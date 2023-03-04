import React from 'react';

import { Group } from 'three';

import TagsGroup from './TagsGroup';
import AnchorsGroup from './AnchorsGroup';

const NodesGroup = React.forwardRef<Group>((_props, ref) => {
  return (
    <group ref={ref}>
      <TagsGroup />
      <AnchorsGroup />
    </group>
  );
});

NodesGroup.displayName = 'forwardRef(NodesGroup)';

export default NodesGroup;
