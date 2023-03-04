import React from 'react';

import useSWRImmutable from 'swr/immutable';
import { Html, Sphere } from '@react-three/drei';

import { Box, styled } from '@mui/material';

const NodeTipContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  userSelect: 'none',
}));

type Tag = {
  id: string;
  name: string;
  positions: Array<{
    position: [number, number, number];
  }>;
};

type TagLocationEventData = {
  deviceId: string;
  deviceType: string;
  position: [number, number, number];
};

const sseUrl = new URL(
  '/devices/tags/_events?eventTypes=position',
  process.env.NEXT_PUBLIC_API_BASE_URL || '',
).href;

function TagsGroup() {
  const { data: tags, mutate: mutateTags } =
    useSWRImmutable<Tag[]>('/devices/tags');

  const onPositionEvent = React.useCallback(
    (event: MessageEvent) => {
      if (!tags) return;

      const { deviceId, position } = JSON.parse(
        event.data,
      ) as TagLocationEventData;

      const tagIndex = tags.findIndex((tag) => tag.id === deviceId);

      if (tagIndex === -1) return;

      const newTagsArray = [
        ...tags.slice(0, tagIndex),
        {
          ...tags[tagIndex],
          positions: [{ position }],
        },
        ...tags.slice(tagIndex + 1),
      ];

      mutateTags(newTagsArray, { revalidate: false });
    },
    [tags, mutateTags],
  );

  React.useEffect(() => {
    const eventSource = new EventSource(sseUrl);
    eventSource.addEventListener('position', onPositionEvent);

    return () => {
      eventSource.removeEventListener('position', onPositionEvent);
      eventSource.close();
    };
  }, [onPositionEvent]);

  if (!tags) return null;

  return (
    <group>
      {tags.map((tag) => (
        <Sphere
          key={tag.id}
          position={tag.positions[0].position}
          args={[0.05]}
          castShadow
          receiveShadow
        >
          <meshPhongMaterial color="red" />

          <Html distanceFactor={3}>
            <NodeTipContainer>
              <span>{tag.name}</span>
              <span>({tag.positions[0].position.join(', ')})</span>
            </NodeTipContainer>
          </Html>
        </Sphere>
      ))}
    </group>
  );
}

export default TagsGroup;
