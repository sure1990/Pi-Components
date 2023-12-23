import MusicTracks from './music-tracks';
import { APIRequestBody, APIResponse } from './types';

const REGISTRY: {
  [method: string]: (body: APIRequestBody) => Promise<APIResponse>;
} = {
  'Tracks:Insert': MusicTracks.InsertTracks,
};

export default async (
  method: string,
  body: APIRequestBody
): Promise<APIResponse> => {
  return REGISTRY[method](body);
};
