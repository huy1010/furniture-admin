import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import { Space, Tooltip, Button, Popconfirm, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'umi';
import ViewDetail from '../viewDetail/index';
const ActionRender = ({ dispatch, item, showModal }) => {

  const setView = () => {
   dispatch({
     type: 'products/setViewDetail',
     payload: item.productId
   })
    showModal();
  };
  const setEdit = () => {
    router.push(`/products/edit/${item.productId}`);
  };
  async function confirm() {
    dispatch({
      type: 'products/delProduct',
      payload: item.productId,
    });
  }
  const handleClickDelete = async () => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        confirm()
      },
    });
  };
  function cancel(e) {
    console.log(e);
  }
  return (
    <div>
      

      <Space size="middle">
        <Tooltip title="Chi tiết">
          <Button
            className={styles.buttonContainer}
            onClick={() => {
              setView();
            }}
          >
            <EyeOutlined />
          </Button>
        </Tooltip>
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
          
            <Button className={styles.buttonContainer} onClick={handleClickDelete}>
              <DeleteOutlined />
            </Button>
        </Tooltip>
      </Space>
    </div>
  );
};

export default ActionRender;
