export type Tag = {
  id: string;
  name: string;
  position?: [number, number, number];
};

export type Tags = Array<Tag>;

export type TagsResponse = Array<{
  id: string;
  name: string;
  positions: Array<{
    position: [number, number, number];
  }>;
}>;

export type TagLocationEventData = {
  deviceId: string;
  deviceType: string;
  position: [number, number, number];
};
