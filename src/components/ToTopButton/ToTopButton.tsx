import { Link, useLocation } from 'react-router-dom';
import './ToTopButton.scss';

export const ToTopButton: React.FC = () => {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Link
      to={`${location.pathname}`}
      className="footer__button-top button-top"
      type="button"
      onClick={handleScrollToTop}
    >
      <p className="button-top__text">
        Back to top
      </p>

      <span className="button-top__icon">
        <i className="fa-solid fa-arrow-up" />
      </span>
    </Link>
  );
};
