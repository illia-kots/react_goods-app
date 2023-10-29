import classNames from 'classnames';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { AuthForm } from './components/AuthForm/AuthForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { productsInit } from './features/productsSlice';

import './App.scss';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(productsInit());
  }, [dispatch]);

  return (
    <div className={classNames(
      'App',
      { 'App--login': !user },
    )}
    >
      {user ? <Header /> : null}

      <div>
        <div className="container">
          {user
            ? <Outlet />
            : <AuthForm />}
        </div>
      </div>

      {user ? <Footer /> : null}
    </div>
  );
};
