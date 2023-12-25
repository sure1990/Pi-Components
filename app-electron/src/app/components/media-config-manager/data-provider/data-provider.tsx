import { FC, PropsWithChildren, useEffect, useState } from 'react';
import DataProviderContext from './data-provider.context';
import { KeyTriggerMap } from './types';

const DataProvider: FC<PropsWithChildren & { keyMapping: KeyTriggerMap }> = ({
  children,
  keyMapping,
}) => {
  const [keysToTrigger, setKeysToTrigger] = useState<KeyTriggerMap>({});

  useEffect(() => setKeysToTrigger(keyMapping), [keyMapping]);
  return (
    <DataProviderContext.Provider value={{ KeyMapping: keysToTrigger }}>
      {children}
    </DataProviderContext.Provider>
  );
};

export default DataProvider;
