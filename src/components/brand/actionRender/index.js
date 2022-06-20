import React, { useState } from 'react';
import styles from './styles.less';
import { Space, Tooltip, Button, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import EditBrand from '../edit/index';
const ActionRender = props => {
  const { dispatch, brand } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editBrand, setEditBrand] = useState(brand);
  React.useEffect(() => {
    setEditBrand(brand);
  },[brand]);
  const handleClickDelete = async () => {
    Modal.confirm({
      title: 'Bạn chắc chắn muốn xóa?',
      onOk: () => {
        const brandId = brand.brandId;
        props.handleDelete(brandId);
      },
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <div>
      <EditBrand
        dispatch={dispatch}
        onCancel={handleCancel}
        visible={isModalVisible}
        brand={editBrand}
      />
      <Space size="middle">
        <Tooltip title="Sửa">
          <Button
            className={styles.buttonContainer}
            onClick={() => {
              showModal();
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
