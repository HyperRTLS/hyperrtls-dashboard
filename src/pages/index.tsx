import React from 'react';

import LiveView from '@/components/LiveView';

import type {
  Anchors,
  AnchorsResponse,
  Tags,
  TagsResponse,
  TagLocationEventData,
} from '@/interfaces';

type TagsAction = {
  type: 'UPDATE_POSITION';
  deviceId: string;
  position: [number, number, number];
};

function tagsReducer(state: Tags, action: TagsAction) {
  switch (action.type) {
    case 'UPDATE_POSITION':
      const { deviceId, position } = action;
      return state.map((tag) =>
        tag.id === deviceId ? { ...tag, position } : tag,
      );
    default:
      return state;
  }
}

type HomeProps = {
  anchors: Anchors;
  tags: Tags;
};

export default function Home({ anchors, ...props }: HomeProps) {
  const [tags, tagsDispatch] = React.useReducer(tagsReducer, props.tags);

  const onPositionEvent = React.useCallback((event: MessageEvent) => {
    const { deviceId, position } = JSON.parse(
      event.data,
    ) as TagLocationEventData;

    tagsDispatch({ type: 'UPDATE_POSITION', deviceId, position });
  }, []);

  React.useEffect(() => {
    const eventSourceUrl = new URL(
      '/devices/tags/_events?eventTypes=position',
      process.env.NEXT_PUBLIC_API_BASE_URL || '',
    );

    const eventSource = new EventSource(eventSourceUrl);
    eventSource.addEventListener('position', onPositionEvent);

    return () => {
      eventSource.removeEventListener('position', onPositionEvent);
      eventSource.close();
    };
  }, [onPositionEvent]);

  return <LiveView anchors={anchors} tags={tags} />;
}

Home.title = 'Dashboard';

export async function getServerSideProps() {
  const anchors = await fetch(
    new URL('/devices/anchors', process.env.NEXT_PUBLIC_API_BASE_URL || ''),
  ).then<AnchorsResponse>((res) => res.json());

  const tags = await fetch(
    new URL('/devices/tags', process.env.NEXT_PUBLIC_API_BASE_URL || ''),
  ).then<TagsResponse>((res) => res.json());

  const transformedTags: Tags = tags.map((tag) => ({
    ...tag,
    positions: null,
    position: tag.positions.at(0)?.position,
  }));

  return { props: { anchors, tags: transformedTags } as HomeProps };
}
