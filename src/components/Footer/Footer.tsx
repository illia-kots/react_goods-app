import { Link } from 'react-router-dom';

import { Logo } from '../Logo';
import { ToTopButton } from '../ToTopButton';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Logo />

        <Link
          to="https://github.com/illia-kots"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>

        <ToTopButton />
      </div>
    </footer>
  );
};
