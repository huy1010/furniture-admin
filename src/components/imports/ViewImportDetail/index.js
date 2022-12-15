import React from 'react';
import { Modal, Table, Image, Button, Row, Col, Descriptions } from 'antd';
import { router } from 'umi';
import styles from './styles.less';
import { moneyConverter, toDate } from '../../../Utils/helper';
const pdfpreview = props => {
  router.push(`/import/invoice/${props.importDetails.importId}`, {
    items: props.importDetails.importDetails,
    idInvoice: props.importDetails.importId,
    importDesc: props.importDetails.importDesc,
    emailImporter: props.importDetails.emailImporter,
    createdAt: props.importDetails.createdAt,
    totalPrice: props.importDetails.totalPrice,
  });
};
const ViewImportDetail = props => {
  console.log(props.importDetails.importId);
  const columns = [
    {
      title: 'Mã hàng',
      dataIndex: 'sku',
      align: 'center',
      width: '30%',
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgUrl',
      align: 'left',
      width: '10%',
      render: item => {
        return <Image width={50} src={item}></Image>;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'center',
      width: '10%',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Giá nhập',
      dataIndex: 'price',
      align: 'center',
      render: item => {
        return moneyConverter(item);
      },
    },
    {
      title: 'Thành tiền',
      align: 'center',
      render: item => {
        return moneyConverter(item.price * item.quantity);
      },
    },
  ];
  const listImport = props.importDetails.importDetails;
  let data = null;
  if (listImport != null) {
    data = listImport.map(value => ({
      sku: value.variant.sku,
      price: value.price,
      quantity: value.quantity,
      variantId: value.variant.variantId,
      imgUrl: value.variant.imgUrl,
    }));
  }

  return (
    <Modal
      className="importDetail"
      width={1020}
      title="CHI TIẾT NHẬP HÀNG"
      visible={props.visible}
      onCancel={props.onCancel}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Row>
        <Col span={20}>
          <Descriptions>
            <Descriptions.Item label="Người nhập" labelStyle={{ fontWeight: 'bold' }}>
              {' '}
              {props?.importDetails?.user?.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày nhập" labelStyle={{ fontWeight: 'bold' }}>
              {props?.importDetails?.createdAt != undefined
                ? toDate(props?.importDetails?.createdAt)
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giá trị" labelStyle={{ fontWeight: 'bold' }}>
              {moneyConverter(props?.importDetails?.totalPrice)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={1} offset={2}>
          <Button className={styles.buttonExport} onClick={() => pdfpreview(props)}>
            Export
          </Button>
        </Col>
        <Col span={19} offset={4}>
          <Table
            columns={columns}
            bordered
            dataSource={data}
            pagination={{ position: ['none', 'none'] }}
          ></Table>
        </Col>
      </Row>
    </Modal>
  );
};

export default ViewImportDetail;
