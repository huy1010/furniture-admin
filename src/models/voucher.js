import { getDataVoucher , addVoucher, editVoucher,deleteVoucher} from "../services/voucher";
import { notification , message} from 'antd';
import {router} from 'umi';
export default {
    namespace: 'voucher',
    state: {
        vouchers: []
    },
    reducers:{
        saveVoucherList(state, action){
            return {
                ...state,
                vouchers: action.payload,
            }
        },
        delete(state, action){
            // state.vouchers.filter(item => item.voucherId !== action.payload.voucherId);
            // alert(JSON.stringify(state.vouchers));
            return {
                ...state,
                vouchers: state.vouchers.filter(item =>item.voucherId !== action.payload.voucherId)
            }
        }
    },
    effects: {
        *getVoucherList(action,{put, call}){
            const res = yield call(getDataVoucher); // getAllData
            console.log(res);
            if (res.status === 200){
                yield put({
                    type: 'saveVoucherList',
                    payload: res.content,
                });
            }
        },
        *addVoucher(action, {put,call}){
            const response = yield call(addVoucher, action.payload);
            if (response.status === 200){
                notification.success({
                    message: `Thêm mới voucher thành công`
                });
                router.goBack();
            }
            else{
                notification.error({ 
                    message: response.errors
                });
            }
        },
        *editVoucher(action, {put,call}){
            const response = yield call(editVoucher, action.payload);
            if (response.status === 200){
                notification.success({
                    message: `Cập nhật voucher thành công`
                });
                router.goBack();
            }
            else{
                notification.error({ 
                    message: response.errors
                });
            }
        },
        *deleteVoucher(action, {put,call}){
            const response = yield call(deleteVoucher, action.payload);
            if (response.status === 200){
                yield put({
                    type: 'delete',
                    payload: action.payload
                });
                notification.success({
                    message: `Xóa voucher thành công`,
                });
            }
            else{
                notification.error({ 
                    message: response.errors,
                });
            }
        }

    }
}