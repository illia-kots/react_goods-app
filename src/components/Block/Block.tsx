import classNames from 'classnames';
import { useState } from 'react';

import { NewProductForm } from '../NewProductForm';
import { ProductFilters } from '../ProductFilters';
import { ProductList } from '../ProductList';
import './Block.scss';

export const Block: React.FC = () => {
  const [isOpenedFilters, setIsOpenedFilters] = useState(false);
  const [isOpenedAddForm, setIsOpenedAddForm] = useState(false);

  const handleFiltersClick = () => {
    if (isOpenedAddForm) {
      setIsOpenedAddForm(false);
    }

    if (!isOpenedFilters) {
      setIsOpenedFilters(true);
    } else {
      setIsOpenedFilters(false);
    }
  };

  const handleAddFormClick = () => {
    if (isOpenedFilters) {
      setIsOpenedFilters(false);
    }

    if (!isOpenedAddForm) {
      setIsOpenedAddForm(true);
    } else {
      setIsOpenedAddForm(false);
    }
  };

  return (
    <div className="block block__container">
      <div className="block__button-container">
        <button
          type="button"
          className={classNames(
            'block__button',
            'button',
            'is-light',
            { 'is-info': !isOpenedFilters },
            { 'is-warning': isOpenedFilters },
          )}
          onClick={handleFiltersClick}
        >
          <p>{!isOpenedFilters ? 'Show filters' : 'Hide filters'}</p>

          <span className="icon">
            <i
              className={classNames(
                'fa-solid',
                { 'fa-filter-circle-xmark': isOpenedFilters },
                { 'fa-filter': !isOpenedFilters },
              )}
            />
          </span>
        </button>

        <button
          type="button"
          className={classNames(
            'block__button',
            'button',
            'is-light',
            { 'is-info': !isOpenedAddForm },
            { 'is-warning': isOpenedAddForm },
          )}
          onClick={handleAddFormClick}
        >
          <p>{!isOpenedAddForm ? 'Show add form' : 'Hide add form'}</p>

          <span className="icon">
            <i
              className={classNames(
                'fa-solid',
                { 'fa-minus': isOpenedAddForm },
                { 'fa-plus': !isOpenedAddForm },
              )}
            />
          </span>
        </button>
      </div>

      <div
        className="
        block__columns
        columns
        is-desktop
        is-flex-direction-row-reverse"
      >
        <div
          className={classNames(
            'block__sidebar',
            'column',
            'is-7-tablet',
            'is-narrow-desktop', {
              'block__sidebar--open':
            isOpenedFilters || isOpenedAddForm,
            },
          )}
        >
          <div className="block__sidebar-container">
            {isOpenedFilters && <ProductFilters />}

            {isOpenedAddForm && <NewProductForm />}
          </div>
        </div>

        <ProductList />
      </div>
    </div>
  );
};
