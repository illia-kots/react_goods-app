import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { productDelete, productUpdate } from '../../features/productsSlice';
import { Product } from '../../types/Product';
import './ProductItem.scss';

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(state => state.products);

  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const {
    id,
    title,
    description,
    price,
    rating,
    stock,
    category,
    thumbnail,
  } = editedProduct;

  const [isEditing, setIsEditing] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);

  const categorySet = new Set(products.map(
    item => item.category,
  ));

  const categoryList = [...categorySet.keys()];

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'price') {
      setEditedProduct({
        ...editedProduct,
        price,
      });
    }

    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setIsEditing(false);
    dispatch(productUpdate({ productId: id, data: { [name]: value } }));
  };

  const handleMouseLeave = () => {
    if (isEditing) {
      setIsEditing(false);

      setEditedProduct({ ...editedProduct });
      dispatch(productUpdate({ productId: id, data: { editedProduct } }));
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
    }

    if (event.key === 'Enter') {
      handleMouseLeave();
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleDropdownClick = (option: string) => {
    setIsEditing(false);
    setSelectedCategory(option);
    dispatch(productUpdate({ productId: id, data: { category: option } }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    setIsProcessed(true);

    dispatch(productDelete(id));
  };

  return (
    <tr
      className={classNames(
        'product-item',
        'product-table__body-item',
        { 'product-item--is-deleting': isProcessed },
      )}
      onKeyDown={handleOnKeyDown}
      onDoubleClick={handleDoubleClick}
      onMouseLeave={handleMouseLeave}
    >
      <td className="product-item__field">
        {id}
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <input
            className="input is-small"
            type="text"
            name="title"
            value={title}
            onChange={(event) => handleFieldChange(event)}
            onBlur={(event) => handleBlur(event)}
          />
        ) : (
          title
        )}
      </td>

      <td className="product-item__field">
        <div className="product-item__image">
          {thumbnail && (
            <img
              className="product-item__pic"
              src={`${thumbnail}`}
              alt={`${title}`}
            />
          )}
        </div>
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <input
            className="input is-small"
            type="number"
            name="price"
            value={price}
            onChange={(event) => handleFieldChange(event)}
            onBlur={(event) => handleBlur(event)}
          />
        ) : (
          `$${price}`
        )}
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <input
            className="input is-small"
            type="number"
            name="rating"
            value={rating}
            onChange={(event) => handleFieldChange(event)}
            onBlur={(event) => handleBlur(event)}
          />
        ) : (
          rating.toFixed(2)
        )}
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <input
            className="input is-small"
            type="number"
            name="stock"
            value={stock}
            onChange={(event) => handleFieldChange(event)}
            onBlur={(event) => handleBlur(event)}
          />
        ) : (
          stock
        )}
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <div className="field">
            <div className="control">
              <div
                className={classNames(
                  'dropdown',
                  { 'is-active': isOpened },
                )}
              >
                <div className="dropdown__trigger dropdown-trigger">
                  <button
                    type="button"
                    className="dropdown__button button is-small"
                    onClick={() => setIsOpened(!isOpened)}
                  >
                    <span>{selectedCategory}</span>

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

                <div className="dropdown__menu dropdown-menu">
                  <div className="dropdown__list dropdown-content">
                    {categoryList.map((categoryItem) => (
                      <option
                        key={categoryItem}
                        className={classNames(
                          'dropdown__item',
                          'dropdown-item',
                          { 'is-active': selectedCategory === categoryItem },
                        )}
                        onClick={() => handleDropdownClick(categoryItem)}
                      >
                        {categoryItem}
                      </option>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          selectedCategory
        )}
      </td>

      <td className="product-item__field">
        {isEditing ? (
          <textarea
            className="textarea is-small"
            name="description"
            value={description}
            onChange={(event) => handleFieldChange(event)}
            onBlur={(event) => handleBlur(event)}
          />
        ) : (
          description
        )}
      </td>

      <td className="product-item__field">
        <button
          type="button"
          className="product-item__button"
          onClick={handleEditClick}
        >
          <span className="icon">
            {isEditing ? (
              <i className="fa-sharp fa-solid fa-circle-xmark" />
            ) : (
              <i className="fa-regular fa-pen-to-square" />
            )}
          </span>
        </button>

        <button
          type="button"
          className="product-item__button"
          onClick={handleDelete}
        >
          <span className="icon">
            <i className="fa-solid fa-trash" />
          </span>
        </button>
      </td>
    </tr>
  );
};
