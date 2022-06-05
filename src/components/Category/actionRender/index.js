import React from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';

const ActionRender = ({ dispatch, item }) => {
  const setEdit = () => {
    dispatch({
        type: 'category/setEdit',
        payload: item,
      });
    router.push(`/category/edit/${item.categoryId}`);
  };

  async function confirm() {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        dispatch({
          type: 'category/delCategory',
          payload: item.categoryId,
        });
      },
    });
  }
  return (
    <Space size="middle">
      <Tooltip title="Sửa">
        <Button
          className={styles.buttonContainer}
          onClick={() => {
            setEdit();
          }}
        >
          <EditOutlined />
        </Button>
      </Tooltip>
      <Tooltip title="Xóa">
       
          <Button className={styles.buttonContainer} onClick={confirm}>
            <DeleteOutlined />
          </Button>
      
      </Tooltip>
    </Space>
  );
};

export default connect()(ActionRender);
