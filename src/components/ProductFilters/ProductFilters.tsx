import classNames from 'classnames';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import './ProductFilters.scss';

export const ProductFilters: React.FC = () => {
  const { products } = useAppSelector(state => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const rating = searchParams.getAll('rating') || [];

  const categorySet = new Set(products.map(
    item => item.category,
  ));

  const categoryList = ['All', ...categorySet.keys()];

  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState('All');

  const ratingList = Array.from(
    { length: 5 },
    (_, i) => `${i + 1}`,
  );

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchParams(
      getSearchWith(searchParams, {
        page: null,
        query: value || null,
      }),
    );
  };

  const handleOptionClick = (option: string) => {
    const capitalizedOption = capitalizeFirstLetter(option);

    setSelectedValue(capitalizedOption);
    setIsOpened(false);
  };

  return (
    <nav className="panel filter">
      <p className="panel-heading filter__title">
        Filters
      </p>

      <div className="panel-block filter__item">
        <p className="control has-icons-left">
          <input
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div
        className="
          panel-block
          is-flex-direction-column
          filter__item
          option"
        onMouseLeave={() => setIsOpened(false)}
      >
        <h4 className="option__title">
          Category
        </h4>

        <div
          className={classNames(
            'option__dropdown',
            'dropdown',
            { 'is-active': isOpened },
          )}
        >
          <div
            className="
              dropdown-trigger
              is-fullwidth
              dropdown__trigger
              trigger"
          >
            <button
              type="button"
              className="trigger__button button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsOpened(!isOpened)}
            >
              <span>{selectedValue}</span>

              <span className="icon is-small">
                <i
                  className={classNames(
                    'fas',
                    { 'fa-angle-down': !isOpened },
                    { 'fa-angle-up': isOpened },
                  )}
                />
              </span>
            </button>
          </div>

          <div className="dropdown-menu dropdown__menu">
            <div className="dropdown-content">
              {categoryList.map(categoryItem => (
                <SearchLink
                  key={categoryItem}
                  className={classNames(
                    'dropdown-item',
                    { 'is-active': category === categoryItem },
                  )}
                  params={{
                    page: null,
                    category: categoryItem === 'All' ? null : categoryItem,
                  }}
                  onClick={() => handleOptionClick(categoryItem)}
                >
                  {capitalizeFirstLetter(categoryItem)}
                </SearchLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="
          panel-block
          filter__item
          option"
      >
        <div
          className="
            level
            is-flex-grow-1
            is-mobile
            is-flex-direction-column
            option__container"
        >
          <h4 className="panel-block__title option__title">
            Rating
          </h4>

          <div className="level-left">
            {ratingList.map(rate => (
              <SearchLink
                key={rate}
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': rating.includes(rate) },
                )}
                params={{
                  page: null,
                  rating: rating.includes(rate)
                    ? rating.filter(rateItem => rateItem !== rate)
                    : [...rating, rate],
                }}
              >
                {rate}
              </SearchLink>
            ))}
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="
            button
            is-link
            is-outlined
            is-fullwidth"
          params={{
            page: null,
            category: null,
            query: null,
            rating: [],
          }}
          onClick={() => setSelectedValue('All')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
