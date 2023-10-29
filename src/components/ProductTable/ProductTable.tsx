import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';
import { SortLink } from '../SortLink';

type Props = {
  products: Product[],
  leftLimit: number;
  rightLimit: number;
};

export const ProductTable: React.FC<Props> = ({
  products, leftLimit, rightLimit,
}) => {
  const [searchParams] = useSearchParams();

  const sortColumn = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const getSortedList = (
    productList: Product[],
    sortParam: string,
    sortType: string | null,
  ) => {
    return productList.sort((a: Product, b: Product) => {
      switch (sortParam) {
        case 'title':
        case 'description':
        case 'brand':
        case 'category':
          return sortType
            ? b[sortParam].localeCompare(a[sortParam])
            : a[sortParam].localeCompare(b[sortParam]);

        case 'id':
        case 'price':
        case 'rating':
        case 'stock':
          return sortType
            ? b[sortParam] - a[sortParam]
            : a[sortParam] - b[sortParam];

        default:
          return 0;
      }
    });
  };

  const sortedProducts = useMemo(() => {
    const sortedList = [...products];

    getSortedList(sortedList, sortColumn, sortOrder);

    return sortedList.slice(leftLimit, rightLimit);
  }, [products, sortColumn, sortOrder, rightLimit, leftLimit]);

  return (
    <table
      className="
        product-table
        table
        is-striped
        is-hoverable
        is-narrow"
    >
      <thead className="product-table__header">
        <tr className="product-table__header-row">
          <th className="product-table__header-col">
            <SortLink column="ID" />
          </th>

          <th className="product-table__header-col">
            <SortLink column="Title" />
          </th>

          <th>Photo</th>

          <th className="product-table__header-col">
            <SortLink column="Price" />
          </th>

          <th className="product-table__header-col">
            <SortLink column="Rating" />
          </th>

          <th className="product-table__header-col">
            <SortLink column="Stock" />
          </th>

          <th className="product-table__header-col">
            <SortLink column="Category" />
          </th>

          <th className="product-table__header-col">
            <SortLink column="Description" />
          </th>

          <th className="product-table__header-col">
            <span className="icon">
              <i className="fa-solid fa-gear" />
            </span>
          </th>
        </tr>
      </thead>

      <tbody className="product-table__body">
        {sortedProducts.map(product => (
          <ProductItem
            product={product}
            key={product.id}
          />
        ))}
      </tbody>
    </table>
  );
};
