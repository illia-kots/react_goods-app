import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../features/userSlice';
import { User } from '../../types/User';
import './LogOut.scss';

export const LogOut = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const saveUser = (currUser: User | null) => {
    localStorage.setItem('user', JSON.stringify(currUser));
  };

  const handleLogOut = () => {
    if (user) {
      saveUser(null);
      dispatch(setUser(null));
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        'button',
        'is-danger',
        { 'button--hidden': !user },
      )}
      onClick={handleLogOut}
    >
      Log out
    </button>
  );
};
