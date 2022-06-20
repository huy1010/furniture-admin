import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Modal, Image, Descriptions, Col, Row, Table, Button, Space } from 'antd';
import styles from './styles.less';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { moneyConverter, getAddress, toDate } from '../../../Utils/helper';
import { router } from 'umi';
function isNumeric(str) {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}
const pdfpreview = props => {
  console.log(props);
  router.push('/orders/invoice/', {
    orderID: props.view.orderId,
    username: props.view.recipientName,
    address: getAddress(props.view.deliveryAddress),
    createdAt: props.view.createdAt,
    orderStatus: props.view.orderStatus,
    paymentStatus: props.view.paymentStatus,
    totalPrice: props.view.totalPrice,
    items: props.view.orderDetails,
    emailExport: props.profile.email,
  });
};
const ViewDetail = ({ visible, onCancel }) => {
  const profile = useSelector(state => state.profile.account);
  const view = useSelector(state => state.orders.orderDetail);
  // const [address,setAddress] = useState('cc');
  // React.useEffect(() => {
  //   setTimeout(() => setAddress(getAddress(view.deliveryAddress)),200);
  // },[view]);
  var column = [
    {
      title: 'Ảnh',
      align: 'center',
      dataIndex: 'variant',
      width: '11%',
      render: item => {
        return <Image width={60} height={60} src={item.imgUrl}></Image>;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'variant',
      align: 'left',
      width: '8%',
      render: item => {
        return item.sku;
      },
    },
    {
      title: 'Đơn giá',
      dataIndex: 'variant',
      align: 'center',
      width: '15%',
      render: item => {
        return moneyConverter(item.price);
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
      width: '15%',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Thành tiền',
      align: 'center',
      width: '12%',
      render: item => {
        return moneyConverter(item.quantity * item.variant.price);
      },
    },
  ];
  return (
    <Modal
      className="cc"
      title="CHI TIẾT ĐƠN HÀNG"
      footer={null}
      visible={visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={1500}
      bodyStyle={{ height: 'unset' }}
      onCancel={onCancel}
    >
      <Row className={styles.viewContainer}>
        <Col span={20}>
          <Descriptions>
            <Descriptions.Item label="Người đặt" labelStyle={{fontWeight: 'bold'}}> {view?.recipientName}</Descriptions.Item>
            <Descriptions.Item label="Ngày đặt" labelStyle={{fontWeight: 'bold'}}>
              {view?.createdAt != undefined ? toDate(view?.createdAt) : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị" labelStyle={{fontWeight: 'bold'}}>{moneyConverter(view?.totalPrice)}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái đơn hàng" labelStyle={{fontWeight: 'bold'}}> {view?.orderStatus}</Descriptions.Item>
            <Descriptions.Item label="Tình trạng thanh toán" labelStyle={{fontWeight: 'bold'}}>
              {view?.paymentStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" labelStyle={{fontWeight: 'bold'}}>
              {view?.deliveryAddress !== undefined ? getAddress(view?.deliveryAddress) : ''}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={1} offset={2}  >
          <Button className={styles.buttonExport}  onClick={() => pdfpreview({ view: view, profile: profile })}>Export</Button>
        </Col>
        <Col span={19} offset={4} className={styles.inforContainer}>
          <span style={{ marginBottom: '20px' }} className={styles.subtitle}>
            Danh sách hàng:
          </span>
          <Table
            className={styles.tableVariant}
            columns={column}
            bordered
            dataSource={view?.orderDetails}
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
