import { Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.tsx';
import { Provider } from 'react-redux';
import Router from './Router.tsx';
import { store } from 'store';
import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingScreen />}>
        <Router />
      </Suspense>
    </Provider>
  );
}

export default App;
