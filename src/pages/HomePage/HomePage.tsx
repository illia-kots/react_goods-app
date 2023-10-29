import { useAppSelector } from '../../app/hooks';
import { Block } from '../../components/Block';
import { ErrorNotification } from '../../components/ErrorNotification';
import { Loader } from '../../components/Loader';
import { ErrorType } from '../../types/ErrorType';

export const HomePage: React.FC = () => {
  const {
    products,
    hasError,
    loaded,
  } = useAppSelector(state => state.products);

  return (
    <>
      {hasError && (
        <ErrorNotification
          error={ErrorType.GET_PRODUCTS}
        />
      )}

      {!loaded && <Loader />}

      {products.length > 0
        && !hasError
        && loaded
        && (
          <>
            <h1
              className="
                title
                d-flex
                justify-content-center"
            >
              Products
            </h1>

            <Block />
          </>
        )}
    </>
  );
};
