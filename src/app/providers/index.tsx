import StoreProvider from '../redux/StoreProvider';
import ReactQueryProvider from './ReactQueryProvider';
import VKUIProvider from './VKUIProvider';

type WithChildren = { children?: React.ReactNode };

type Provider = ({ children }: WithChildren) => React.ReactElement;

const compose = (...providers: Provider[]) =>
  function ({ children }: WithChildren) {
    return (
      <>
        {providers.reduce(
          (childrenInContext, Element) => (
            <Element>{childrenInContext}</Element>
          ),
          children,
        )}
      </>
    );
  };

const AppProvider = compose(VKUIProvider, StoreProvider, ReactQueryProvider);
export default AppProvider;
