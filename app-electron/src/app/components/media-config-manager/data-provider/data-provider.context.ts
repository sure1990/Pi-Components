import { createContext } from 'react';
import { KeyTriggerMap } from './types';

type DataProviderContextType = {
  KeyMapping: KeyTriggerMap;
};

const DataProviderContext = createContext<DataProviderContextType>({
  KeyMapping: {},
});

export default DataProviderContext;
