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
            name={anchor.name}
            position={anchor.position}
            color="yellow"
          />
        ))}

        {tags.map((tag) => (
          <Node
            key={tag.id}
            name={tag.name}
            position={tag.position}
            color="hotpink"
          />
        ))}
      </group>
    );
  },
);

NodesGroup.displayName = 'forwardRef(NodesGroup)';

export default NodesGroup;
