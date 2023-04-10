import React from 'react';

import type { Group } from 'three';

import Node from './Node';

import type { Anchors, Tags } from '@/interfaces';

type NodesGroupProps = {
  anchors: Anchors;
  tags: Tags;
};

const NodesGroup = React.forwardRef<Group, NodesGroupProps>(
  ({ anchors, tags, ...rest }, ref) => {
    return (
      <group ref={ref} {...rest}>
        {anchors.map((anchor) => (
          <Node
            key={anchor.id}
            name={`[ANCHOR] ${anchor.name}`}
            position={anchor.position}
            color="#C576F6"
          />
        ))}

        {tags.map((tag) => (
          <Node
            key={tag.id}
            name={`[TAG] ${tag.name}`}
            position={tag.position}
            color="#89cff0"
          />
        ))}
      </group>
    );
  },
);

NodesGroup.displayName = 'forwardRef(NodesGroup)';

export default NodesGroup;
