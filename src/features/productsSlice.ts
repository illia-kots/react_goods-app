import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../api/getProducts';
import { Product } from '../types/Product';

type State = {
  products: Product[];
  loaded: boolean;
  hasError: boolean;
};

const initialState: State = {
  products: [],
  loaded: false,
  hasError: false,
};

export const productsInit = createAsyncThunk(
  'products/fetch', () => getProducts(),
);

export const productCreate = createAsyncThunk(
  'products/create', async ({ ...args }: Omit<Product, 'id'>) => {
    const newProduct = await createProduct({ ...args });

    return newProduct;
  },
);

export const productUpdate = createAsyncThunk(
  'products/update',
  async ({ productId, data }: { productId: number, data: {} }) => {
    const updatedProduct = await updateProduct(productId, data);

    return updatedProduct;
  },
);

export const productDelete = createAsyncThunk(
  'products/delete', (productId: number) => deleteProduct(productId),
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => ({
      ...state,
      products: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(productsInit.pending, (state) => ({
      ...state,
      loaded: false,
      hasError: false,
    }));

    builder.addCase(productsInit.fulfilled, (state, action) => ({
      ...state,
      products: action.payload,
      loaded: true,
      hasError: false,
    }));

    builder.addCase(productsInit.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(productCreate.fulfilled, (state, action) => ({
      ...state,
      products: [...state.products, action.payload],
    }));

    builder.addCase(productCreate.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(productUpdate.fulfilled, (state, action) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id !== action.payload.id) {
          return product;
        }

        return action.payload;
      });

      return {
        ...state,
        products: updatedProducts,
      };
    });

    builder.addCase(productUpdate.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));

    builder.addCase(productDelete.fulfilled, (state, action) => ({
      ...state,
      products: state.products.filter(
        (product) => product.id !== action.payload.id,
      ),
    }));

    builder.addCase(productDelete.rejected, (state) => ({
      ...state,
      loaded: true,
      hasError: true,
    }));
  },
});

export default productsSlice.reducer;
export const { setProducts } = productsSlice.actions;
