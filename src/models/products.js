import {
  getDataProduct,
  addProduct,
  addVariant,
  editProduct,
  editVariant,
  delProduct,
  delVariant,
  getProductDetail,
} from '../services/product';
import { uploader } from '../Utils/uploader';
import { notification } from 'antd';
import { router } from 'umi';
import { NotificationOutlined } from '@ant-design/icons';
export default {
  namespace: 'products',
  state: {
    products: [],
    viewId: 0,
    view: {
      productId: 1,
      productName: 'Sloan Left Chaise Sleeper Sectional',
      categoryId: 5,
      categoryName: 'Sleeper Sectional',
      brandId: 1,
      brandName: 'Sloan',
      productDesc: null,
      image:
        'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:LEG007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
      variants: [
        {
          variantId: 1,
          sku: 'SLON.FABRIC.SECT.SSLEFT - BI-132 - Leg007-1',
          price: 3245,
          importPrice: 1000,
          quantity: 10,
          image:
            'https://content.cylindo.com/api/v2/4472/products/SLON.FABRIC.SECT.SSLEFT/frames/1/SLON.FABRIC.SECT.SSLEFT.JPG?background=FFFFFF&feature=COLOR:BI-132&feature=FINISH:Leg007-1&feature=CHAISE%20LENGTH:CHAISE-63&feature=CUSHIONS:CUSHION-2&feature=BED:BED_IN',
          options: [
            {
              optionId: 1,
              optionName: 'Chất liệu',
              optionValue: 'Opal',
            },
            {
              optionId: 2,
              optionName: 'Chất liệu chân',
              optionValue: 'Oiled Walnut',
            },
          ],
        },
      ],
    },
  },
  effects: {
    *getProductList(action, { put, call }) {
      const response = yield call(getDataProduct);

      if (response.status === 200) {
        yield put({
          type: 'saveProductList',
          payload: response.content,
        });
      }
    },
    *addProduct(action, { put, call }) {
      const response = yield call(addProduct, action.payload);
      if (response.status === 200) {
        for (var element of action.payload.variants) {
          element['productId'] = response.content.productId;

          const respon = yield call(addVariant, element);
          if (respon.status !== 201) {
            notification.error({ message: respon.errors });
            break;
          } else {
            router.goBack();
            notification.success({ message: 'Add product success!' });
          }
        }
      } else {
        notification.error({ message: response.errors });
      }
    },
    *editProduct(action, { put, call }) {
      const response = yield call(editProduct, action.payload);
      if (response.status === 200) {
        notification.success({ message: 'Save success' });
      } else {
        notification.error({ message: response.content });
      }
    },
    *editVariant(action, { put, call }) {
      const response = yield call(editVariant, action.payload);
      if (response.status === 201) {
        notification.success({ message: 'Edit success' });
      } else {
        notification.error({ message: response.content });
      }
    },
    *delProduct(action, { put, call }) {
      const response = yield call(delProduct, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'deleteProduct',
          payload: action.payload,
        });
        notification.success({ message: 'Detele success' });
      } else {
        notification.error({ message: response.content });
      }
    },
    *delVariant(action, { put, call }) {
      const response = yield call(delVariant, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'deleteVariant',
          payload: action.payload,
        });
        notification.success({ message: 'Delete success' });
      } else {
        notification.error({ message: response.content });
      }
    },
    *setViewDetail({ payload }, { put, call }) {
      const response = yield call(getProductDetail, payload);
      if (response.status === 200) {
        yield put({
          type: 'setViewProduct',
          payload: response.content,
        });
      }
    },
  },
  reducers: {
    deleteProduct(state, action) {
      const product = state.products.filter(item => item.productId !== action.payload);
      return {
        ...state,
        products: product,
      };
    },
    deleteVariant(state, action) {
      // update view
      let currProduct = state.view;
      currProduct.variants = currProduct.variants.filter(item => item.variantId !== action.payload);
      //update product list
      let productList = state.products.map(obj =>
        obj.productId === currProduct.productId ? { ...obj, variants: currProduct.variants } : obj,
      );
      return {
        ...state,
        view: currProduct,
        products: productList,
      };
    },
    saveProductList(state, action) {
      return {
        ...state,
        products: action.payload,
        view: action.payload[0],
      };
    },
    setViewProduct(state, action) {
      return {
        ...state,
        view: action.payload,
      };
    },
    setviewId(state, action) {
      return {
        ...state,
        viewId: action.payload,
      };
    },
  },
};
