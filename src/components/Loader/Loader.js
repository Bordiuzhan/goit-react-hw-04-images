import { Bars } from 'react-loader-spinner';
import { WraperLoader } from './Loader.styled';

export const Loader = () => {
  return (
    <WraperLoader>
      <Bars></Bars>
    </WraperLoader>
  );
};
