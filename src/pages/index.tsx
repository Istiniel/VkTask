import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Main from './Main';
import NotFound from './NotFound';
import SharedLayout from './SharedLayout';

export function getRoutes() {

  return (
    <Route path="/" element={<SharedLayout />} >
      <Route index element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

function AppRouter() {
  const routes = createRoutesFromElements(getRoutes());
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default AppRouter;
