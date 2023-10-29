import classNames from 'classnames';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { productCreate } from '../../features/productsSlice';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { Product } from '../../types/Product';
import './NewProductForm.scss';

export const NewProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(state => state.products);

  const [isOpened, setIsOpened] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Choose category');

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Title is required'),
    category: Yup.string(),
    price: Yup.number()
      .positive()
      .required('Price is required'),
    stock: Yup.number(),
    brand: Yup.string(),
    rating: Yup.number()
      .min(0, 'Minimum rating is 0')
      .max(5, 'Maximum rating is 5')
      .positive()
      .required('Rating is required'),
    thumbnail: Yup.string().url('Invalid URL'),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      price: 0,
      stock: 0,
      brand: '',
      rating: 0,
      description: '',
      thumbnail: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const newProduct: Omit<Product, 'id'> = {
        title: values.title,
        category: values.category,
        price: values.price,
        stock: values.stock,
        brand: values.brand,
        rating: values.rating,
        description: values.description,
        thumbnail: values.thumbnail,
      };

      dispatch(productCreate(newProduct));

      formik.resetForm();
    },
  });

  const categorySet = new Set(products.map(
    item => item.category,
  ));

  const categoryList = [...categorySet.keys()];

  const handleOptionClick = (option: string) => {
    const capitalizedOption = capitalizeFirstLetter(option);

    setSelectedValue(capitalizedOption);
    setIsOpened(false);

    formik.setFieldValue('category', option);
  };

  return (
    <nav
      className="
        panel
        filter
        new-product-form"
    >
      <p
        className="
          panel-heading
          filter__title
          new-product-form__title"
      >
        Add new product
      </p>

      <div
        className="
          panel-block
          new-product-form__container"
      >
        <form
          className="new-product-form__form form"
          onSubmit={formik.handleSubmit}
        >
          <div className="form__field field">
            <label className="form__title label" htmlFor="title">
              Title
            </label>

            <div className="form__input-container control">
              <input
                className="form__input input"
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.title
              && formik.errors.title
              && (
                <p
                  className="
                      form__warning
                      help
                      is-danger"
                >
                  {formik.errors.title}
                </p>
              )}
          </div>

          <div
            className="form__field field"
            onMouseLeave={() => setIsOpened(false)}
          >
            <label className="form__title label" htmlFor="category">
              Category
            </label>

            <div className="form__input-container control">
              <div
                className={classNames(
                  'form__dropdown',
                  'dropdown',
                  { 'is-active': isOpened },
                )}
              >
                <div className="dropdown__trigger dropdown-trigger">
                  <button
                    type="button"
                    className="dropdown__button button"
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

                <div
                  className="dropdown__menu dropdown-menu"
                  id="dropdown-menu"
                  role="menu"
                >
                  <div className="dropdown__content dropdown-content">
                    {categoryList.map((categoryItem) => (
                      <option
                        key={categoryItem}
                        className={classNames(
                          'dropdown__item',
                          'dropdown-item',
                          { 'is-active': selectedValue === categoryItem },
                        )}
                        onKeyDown={() => handleOptionClick(categoryItem)}
                        onClick={() => handleOptionClick(categoryItem)}
                      >
                        {capitalizeFirstLetter(categoryItem)}
                      </option>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {formik.touched.category
              && formik.errors.category
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.category}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="price">
              Price
            </label>

            <div className="form__input-container control">
              <input
                className="form__input input"
                type="number"
                name="price"
                id="price"
                min={0}
                max={100000}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.price
              && formik.errors.price
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.price}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="stock">
              Stock
            </label>

            <div className="form__title-container control">
              <input
                className="form__input input"
                type="number"
                name="stock"
                id="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.stock
              && formik.errors.stock
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.stock}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="brand">
              Brand
            </label>

            <div className="form__input-container control">
              <input
                className="form__input input"
                type="text"
                name="brand"
                id="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.brand
              && formik.errors.brand
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.brand}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="rating">
              Rating
            </label>

            <div className="form__input-container control">
              <input
                className="form__input input"
                type="number"
                name="rating"
                id="rating"
                min={0}
                max={5}
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.rating
              && formik.errors.rating
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.rating}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="thumbnail">
              Image URL
            </label>

            <div className="form__input-container control">
              <input
                className="form__input input"
                type="text"
                name="thumbnail"
                id="thumbnail"
                value={formik.values.thumbnail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.thumbnail
              && formik.errors.thumbnail
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.thumbnail}
                </p>
              )}
          </div>

          <div className="form__field field">
            <label className="form__title label" htmlFor="description">
              Description
            </label>

            <div className="form__input-container control">
              <textarea
                className="
                  form__input
                  form__textarea
                  textarea"
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {formik.touched.description
              && formik.errors.description
              && (
                <p
                  className="
                    form__warning
                    help
                    is-danger"
                >
                  {formik.errors.description}
                </p>
              )}
          </div>

          <button
            type="submit"
            className="
              form__button
              button
              is-primary
              is-fullwidth"
          >
            Add product
          </button>
        </form>
      </div>
    </nav>
  );
};
