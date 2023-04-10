export type Anchor = {
  id: string;
  name: string;
  position: [number, number, number];
};

export type Anchors = Array<Anchor>;

export type AnchorsResponse = Array<Anchor>;
