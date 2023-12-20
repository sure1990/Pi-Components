const REGISTRY: { [method: string]: (body: any) => Promise<any> } = {
  "Frames:Save": async (frames: any) => {
    return frames
  },
};

export default async (method: string, body: any): Promise<any> => {
  return REGISTRY[method](body);
};
