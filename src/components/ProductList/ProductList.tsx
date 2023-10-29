import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ITEMS_PER_PAGE } from '../../app/const';
import { useAppSelector } from '../../app/hooks';
import { ErrorType } from '../../types/ErrorType';
import { Product } from '../../types/Product';
import { ErrorNotification } from '../ErrorNotification';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductTable } from '../ProductTable';

export const ProductList: React.FC = () => {
  const {
    products,
    hasError,
    loaded,
  } = useAppSelector(state => state.products);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || '1';

  const filteredProducts = useMemo((): Product[] => {
    const rating = searchParams.getAll('rating') || [];

    let filteredProductsList = [...products];

    if (query) {
      const queryFilter = (param?: string | null) => {
        return param
          ? param.toLowerCase().includes(query.toLowerCase())
          : null;
      };

      filteredProductsList = filteredProductsList.filter(
        product => queryFilter(product.title)
          || queryFilter(product.category),
      );
    }

    if (category) {
      filteredProductsList = filteredProductsList.filter(
        product => product.category === category,
      );
    }

    if (rating.length > 0) {
      const formatRating = (product: Product) => {
        return Math.floor(product.rating).toString();
      };

      filteredProductsList = filteredProductsList.filter(
        product => rating.includes(formatRating(product)),
      );
    }

    return filteredProductsList || null;
  }, [category, products, query, searchParams]);

  let leftLimit = 0;
  let rightLimit = useMemo(() => {
    if (!query || !category || page) {
      return products.length;
    }

    return filteredProducts.length;
  }, [category, filteredProducts.length, page, products.length, query]);

  if (page && ITEMS_PER_PAGE) {
    leftLimit = ITEMS_PER_PAGE * (+page - 1);

    rightLimit = ITEMS_PER_PAGE * +page > products.length
      ? products.length
      : ITEMS_PER_PAGE * +page;
  } else {
    leftLimit = 0;
    rightLimit = products.length;
  }

  const visibleProducts = useMemo((): Product[] => {
    return filteredProducts.slice(leftLimit, rightLimit);
  }, [filteredProducts, leftLimit, rightLimit]);

  return (
    <div className="product-list column">
      <div
        className="
          product-list__container
          box
          table-container"
      >
        {!loaded && <Loader />}

        {hasError
          && loaded
          && (
            <ErrorNotification
              error={ErrorType.GET_PRODUCTS}
            />
          )}

        {!hasError
          && loaded
          && !visibleProducts.length
          && (
            <p>
              There are no products matching the current search criteria
            </p>
          )}

        {!hasError
          && loaded
          && visibleProducts.length > 0
          && (
            <ProductTable
              products={filteredProducts}
              leftLimit={leftLimit}
              rightLimit={rightLimit}
            />
          )}
      </div>

      {!hasError
          && loaded
          && filteredProducts.length >= ITEMS_PER_PAGE
          && (
            <Pagination
              length={filteredProducts.length}
            />
          )}
    </div>
  );
};
