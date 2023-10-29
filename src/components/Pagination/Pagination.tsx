import classNames from 'classnames';
import { useEffect, useState } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { ITEMS_PER_PAGE } from '../../app/const';
import { ButtonType } from '../../types/ButtonType';
import { getSearchWith } from '../../utils/searchHelper';
import './Pagination.scss';

type Props = {
  length: number,
};

export const Pagination: React.FC<Props> = ({ length }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState(0);

  const page = searchParams.get('page') || '1';

  const paginationList = (totalPages > 1)
    ? (Array.from(
      { length: totalPages },
      (_, i) => i + 1,
    ))
    : [1];

  const disabledLeftButton = (page === '1');

  const disabledRightButton = (page === '1')
    ? (page === `${totalPages + 1}`)
    : (page === `${totalPages}`);

  const handlePageClick = (pageItem: number) => {
    if (page === `${pageItem}`) {
      return;
    }

    const newParams = getSearchWith(
      searchParams, {
        page: `${pageItem}`,
      },
    );

    navigate({ search: newParams });
  };

  const handleArrowClick = (type: ButtonType) => {
    const currentPage = page
      ? +page
      : null;

    if (type === 'prev' && currentPage) {
      if (currentPage === 1) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage - 1}`,
        },
      );

      navigate({ search: newParams });
    }

    if (type === 'next' && currentPage) {
      if (currentPage === totalPages) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage + 1}`,
        },
      );

      navigate({ search: newParams });
    }
  };

  useEffect(() => {
    const getTotalPages = () => {
      if (!ITEMS_PER_PAGE) {
        return 0;
      }

      return Math.ceil(length / ITEMS_PER_PAGE);
    };

    const pages = getTotalPages();

    setTotalPages(pages);
  }, [length]);

  return (
    <div className="category-page__pagination">
      <ul className="pagination">
        <button
          type="button"
          className="pagination__button"
          disabled={disabledLeftButton}
          onClick={() => handleArrowClick('prev')}
        >
          <span className="pagination__icon">
            <i className="fa-solid fa-arrow-left" />
          </span>
        </button>

        <div className="pagination__list">
          {paginationList.map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              className={
                classNames('pagination__item', {
                  'pagination__item--is-active': +page === pageNumber,
                })
              }
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination__button"
          disabled={disabledRightButton}
          onClick={() => handleArrowClick('next')}
        >
          <span className="pagination__icon">
            <i className="fa-solid fa-arrow-right" />
          </span>
        </button>
      </ul>
    </div>
  );
};
