import { getCustomers, getStaffs,addUser } from '../services/user';
import { notification } from 'antd';
export default {
  namespace: 'user',
  state: {
    staffs: [],
    customers: [],
  },
  effects: {
    *getUsers(action, { put, call }) {
        yield put({
            type: 'getCustomers'
        })
        yield put({
            type: 'getStaffs'
        })
    },
    *getCustomers(action, { put, call }) {
      const response = yield call(getCustomers);
      if (response.status === 200) {
        yield put({
          type: 'saveCustomers',
          payload: response.content,
        });
        console.log(response.content);
      }
    },
    *getStaffs(action, { put, call }) {
      const response = yield call(getStaffs);
      if (response.status === 200) {
        yield put({
          type: 'saveStaffs',
          payload: response.content,
        });
      }
    },
    *createUser(action, {put, call}) {
      const response = yield call(addUser, action.payload);
      console.log(response);
      if (response.status === 200) {
        notification.success({
          message: 'Create success'
        })
      } else {
        notification.error({
          message: response.errors
        })
      }
    }
  },
  reducers: {
    saveCustomers(state, action) {
      return {
        ...state,
        customers: action.payload,
      };
    },
    saveStaffs(state, action) {
      return {
        ...state,
        staffs: action.payload,
      };
    },
  },
};
