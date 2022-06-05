import { getDataBrand, addDataBrand, delDataBrand, updateDataBrand } from '../services/brand';
export default {
  namespaces: 'brands',
  state: {
    brandView: {
      brand_id: 1,
      name: 'thương hiệu A',
      description: 'Đây là thương hiệu A',
      is_deleted: 0,
    },
    brands: [],
  },
  effects: {
    //get brand
    *getBrandList(action, { put, call }) {
      const response = yield call(getDataBrand);
      if (response.status === 200) {
        yield put({
          type: 'saveBrandList',
          payload: response.content,
        });
      }
    },
    //add brand
    *addBrand({ payload }, { put, call }) {
      const response = yield call(addDataBrand, payload);
      if (response.status === 200) {
        yield put({
          type: 'getBrandList',
        });
      }
    },
    //update brand
    *updateBrand({ payload }, { put, call }) {
      const response = yield call(updateDataBrand, payload);
     if(response.status === 200) { 
       yield put({
        type: 'editBrand',
        payload: response.content,
      });
    }
    },
    //delete brand
    *deleteBrand({ payload }, { put, call }) {
      yield call(delDataBrand, payload);
      yield put({ type: 'delBrand', payload: payload });
    },
  },
  reducers: {
    createBrand(state, { payload }) {
      const brand = {
        brandName: payload.brandName,
        brandId: payload.brandId,
        brandDesc: payload.brandDesc,
      };
      const newStateBrands = [...state.brands];
      newStateBrands[state.items.length] = brand;
      return { ...state, brands: newStateBrands };
    },
    editBrand(state, { payload }) {
      const { brandId } = payload;
      const newStateItems = [...state.brands];
      const index = newStateItems.findIndex(brand => brand.brandId === brandId);
      newStateItems[index] = payload;
      return { ...state, brands: newStateItems };
    },
    delBrand(state, { payload }) {
      const previousState = state.brands;
      var newState = previousState.filter(brand => brand.brandId !== payload);
      return { ...state, brands: newState };
    },
    saveBrandList(state, action) {
      return {
        ...state,
        brands: action.payload,
      };
    },
  },
};
