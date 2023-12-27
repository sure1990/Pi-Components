import { SelectKeyTriggers } from './key-triggers';
import MusicTracks from './music-tracks';
import { APIRequestBody, APIResponse } from '../../shared/types';

const REGISTRY: {
  [method: string]: (body: APIRequestBody) => Promise<APIResponse>;
} = {
  'Tracks:Insert': MusicTracks.InsertTracks,
  'KeyMap:Select': SelectKeyTriggers,
  'Tracks:Fetch': MusicTracks.FetchTracks,
};

export default async (
  method: string,
  body: APIRequestBody
): Promise<APIResponse> => {
  return REGISTRY[method](body);
};
