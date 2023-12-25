import { useContext } from 'react';
import DataProviderContext from './data-provider.context';

const useConfigManagerDataProvider = () => {
  const ctx = useContext(DataProviderContext);

  return { KeyMapping: ctx.KeyMapping };
};

export default useConfigManagerDataProvider;
