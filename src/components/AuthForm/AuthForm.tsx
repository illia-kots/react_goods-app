import classNames from 'classnames';
import { FormEvent, useEffect, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/userSlice';
import { ErrorType } from '../../types/ErrorType';
import { User } from '../../types/User';
import './AuthForm.scss';

export const AuthForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorType | null>(null);
  const dispatch = useAppDispatch();

  const saveUser = (currUser: User) => {
    localStorage.setItem('user', JSON.stringify(currUser));
  };

  const loadUser = () => {
    const userList = [
      {
        name: 'testuser',
        password: 'testpassword123',
      },
    ] as User[];

    const foundUser = userList
      .find((u: User) => u.name === name
        && u.password === password);

    if (foundUser) {
      saveUser(foundUser);
      dispatch(setUser(foundUser));
    } else {
      setErrorMessage(ErrorType.LOGIN);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setErrorMessage(null);
    setLoading(true);

    try {
      await loadUser();
    } catch {
      setErrorMessage(ErrorType.AUTH_WARN);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, password]);

  return (
    <form
      className="auth-form box"
      onSubmit={handleSubmit}
    >
      <h1 className="title is-3 is-info">
        Log in
      </h1>

      <div className="field">
        <label className="label has-text-weight-light" htmlFor="name">
          Enter your name
          {' '}
          <span className="help is-size-7 m-0 has-text-weight-bold">
            (Only english letters)
          </span>
        </label>

        <div
          className={classNames(
            'control',
            'has-icons-left',
            { 'is-loading': loading },
          )}
        >
          <input
            type="text"
            id="user-name"
            name="username"
            className={classNames(
              'input',
              { 'is-danger': errorMessage },
            )}
            placeholder="Enter your username"
            minLength={3}
            disabled={loading}
            value={name}
            required
            onChange={event => setName(event.target.value)}
            autoComplete="current-username"
            pattern="^[A-Za-z]+$"
          />

          <span
            className="
              icon
              is-small
              is-left"
          >
            <i className="fas fa-user" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label has-text-weight-light" htmlFor="user-password">
          Enter password
        </label>

        <div
          className={classNames(
            'control',
            'has-icons-left',
            { 'is-loading': loading },
          )}
        >
          <input
            type="password"
            id="user-password"
            className={classNames(
              'input',
              { 'is-danger': errorMessage },
            )}
            placeholder="Enter your password"
            required
            minLength={4}
            disabled={loading}
            value={password}
            onChange={event => setPassword(event.target.value)}
            autoComplete="current-password"
          />

          <span
            className="
                icon
                is-small
                is-left"
          >
            <i className="fas fa-lock" />
          </span>
        </div>
      </div>

      <div className="field">
        <button
          type="submit"
          className={classNames(
            'button',
            'is-danger',
            { 'is-loading': loading },
          )}
        >
          Log in
        </button>

        {errorMessage
            && (
              <p className="help is-danger mt-3 is-size-5">
                {errorMessage}
              </p>
            )}
      </div>
    </form>
  );
};
