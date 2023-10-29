import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="./images/icons/logo.svg"
        alt="logo"
      />
    </Link>
  );
};
