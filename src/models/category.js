import { getCategoryList, addCategory, editCategory, delCategory,getAttributeList } from '../services/category';
import { notification } from 'antd';

export default {
  namespace: 'category',
  state: {
    categories: [],
    editCategory: {},
    attributes: [
      {
        "attributeId": 1,
        "attributeName": "Vi xử lý(CPU)",
        "attributeIcon": "mdi-focus-field"
      },
      {
        "attributeId": 2,
        "attributeName": "RAM",
        "attributeIcon": "mdi-focus-field-horizontal"
      },
      {
        "attributeId": 3,
        "attributeName": "Màn hình",
        "attributeIcon": "mdi-laptop"
      },
      {
        "attributeId": 4,
        "attributeName": "Card đồ họa (GPU)",
        "attributeIcon": "mdi-apps-box"
      }
    ],
  },
  effects: {
    *getCategoryList(action, { put, call }) {
      const response = yield call(getCategoryList);
      const res = yield call(getAttributeList);
      if (response.status === 200 && res.status === 200) {
        yield put({
          type: 'saveCategoryList',
          payload: response.content,
        });
        yield put({
          type: 'saveAttributeList',
          payload: res.content,
        });
      }
    },
    *delCategory(action, { put, call }) {
      const response = yield call(delCategory, action.payload);
      if (response.status === 200) {
        yield put({
          type: 'delCate',
          payload: action.payload,
        });
      } else {
        notification.error({ message: response.content });
      }
    },
    *addCategory(action, { put, call }) {
      const response = yield call(addCategory, action.payload);

      if (response.status === 200) {
        
      } else {
        notification.error({ message: response.errors });
      }
    },
    *editCategory(action, { put, call }) {
      const response = yield call(editCategory, action.payload);
      if (response.status === 200) {
       
      } else {
        notification.error({ message: response.errors });
      }
    },
  },
  reducers: {
    saveCategoryList(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },
    saveAttributeList(state, action) {
     
      return {
        ...state,
        attributes: action.payload,
      };
    },
    delCate(state,{payload}) {
      const previousState = state.categories;
      var newState = previousState.filter(cate => cate.categoryId !== payload);
      return{
        ...state,
        categories: newState
      }
    },
    setEdit(state, action) {
      return {
        ...state,
        editCategory: action.payload,
      };
    },
  },
};
