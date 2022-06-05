import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Modal, Image, Descriptions, Col, Row, Table, Button, Space } from 'antd';
import styles from './styles.less';
import ActionRender from '../variant/actionRender/index';
import { moneyConverter, EMPTY_IMAGE } from '../../../Utils/helper';
function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}
const ViewDetail = ({ visible, onCancel,dispatch }) => {
  var viewId = useSelector(state => state.products.viewId);
  var view = useSelector(state => state.products.view);
  var column = [
    {
      title: 'ID',
      dataIndex: 'variantId',
      align: 'left',
      width: '8%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgUrl',
      align: 'center',
      width: '11%',
      render: item => {
        console.log(item);
        return <Image width={60} height={60} src={item != '' && item != undefined ? item : EMPTY_IMAGE}></Image>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      align: 'center',
      width: '13%',
    },
    {
      title: 'Tên',
      dataIndex: 'variantName',
      align: 'center',
      width: '25%',
    },
    // {
    //   title: 'Giá nhập',
    //   dataIndex: 'importPrice',
    //   align: 'center',
    //   width: '15%',
    //   render: item => {
    //     return moneyConverter(item);
    //   },
    // },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      align: 'center',
      width: '15%',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
      width: '12%',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Hành động',
      align: 'center',
      width: '12%',
      render: item => {
        return <ActionRender item={item} productId={view?.productId} />;
      },
    },
  ];
  return (
    <Modal
      className="cc"
      title="CHI TIẾT SẢN PHẨM"
      footer={null}
      visible={visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={1500}
      bodyStyle={{ height: 'unset' }}
      onCancel={onCancel}
    >
      <Row className={styles.viewContainer}>
        <Col span={24}>
          <Descriptions>
            <Descriptions.Item label="Mã sản phẩm" labelStyle={{fontWeight: 'bold'}}> {view?.productId}</Descriptions.Item>
            <Descriptions.Item label="Phân loại" labelStyle={{fontWeight: 'bold'}}>
              {view?.category?.categoryName}
            </Descriptions.Item>
            <Descriptions.Item label="Hãng" labelStyle={{fontWeight: 'bold'}}>{view?.brand?.brandName}</Descriptions.Item>
            <Descriptions.Item label="Tên sản phẩm" labelStyle={{fontWeight: 'bold'}}> {view?.productName}</Descriptions.Item>
            <Descriptions.Item label="Mô tả" labelStyle={{fontWeight: 'bold'}}>{view?.productDesc}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={4} className={styles.carouContainer}>
          <Image
            className={styles.image}
            width={220}
            height={280}
            src={view?.imgUrl != '' ? view?.imgUrl : EMPTY_IMAGE}
          />
        </Col>
        <Col span={19} offset={1} className={styles.inforContainer}>
          <span style={{ marginBottom: '20px' }} className={styles.subtitle}>
            Danh sách phiên bản:
          </span>
          <Table
            className={styles.tableVariant}
            columns={column}
            bordered
            dataSource={view?.variants}
            pagination={{ position: ['none', 'none'] }}
            scroll={{ y: 400 }}
          ></Table>
        </Col>
      </Row>
    </Modal>
  );
};

export default connect(state => ({
  products: state.products,
}))(ViewDetail);
