import React, { useState } from 'react';
import { Modal, Button, Form, Input, Image, Row, Col, Upload } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { EMPTY_IMAGE } from '../../../Utils/helper';
import { uploader } from '../../../Utils/uploader';
import { connect, useSelector } from 'dva';
const EditBrand = props => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { dispatch, brand } = props;
  const [state, setState] = useState({
    imgUrl: '',
  });
  React.useEffect(() =>{
     onFill()
     setState({
       ...state,
       imgUrl: brand.imgUrl
     })
  // eslint-disable-next-line no-use-before-define
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const clear = () => {
    setState({
      ...state,
      imgUrl: brand.imgUrl,
    });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFill = () => {
    var formFill = {};
    formFill['brandName'] = brand.brandName;
    formFill['brandDesc'] = brand.brandDesc;
    form.setFieldsValue(formFill);
  }
  const setImageBrand = async file => {
    let url = await uploader(file);
    setState({
      ...state,
      imgUrl: url,
    });
  };
  const handleSubmit = async () => {
    const validatedAllFields = await form.validateFields();
    const { brandName, brandDesc } = validatedAllFields;
    let updateBrand = { brandName, brandDesc };
    updateBrand.brandId = brand.brandId;
    updateBrand.imgUrl = state.imgUrl;
    document.getElementById('formUpdate').reset();
    clear();
    dispatch({
      type: 'brands/updateBrand',
      payload: updateBrand,
    });
    props.onCancel();
  };
  return (
    <Modal
      title="Chỉnh sửa thương hiệu"
      className="editBrand"
      onCancel={() => {
        clear();
        props.onCancel();
      }}
      visible={props.visible}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={800}
      bodyStyle={{ height: 'unset' }}
    >
      <Row>
        <Col span={4}>
          <Row>
            <Col span={24}>
              <Image
                src={state.imgUrl !== '' ? state.imgUrl : EMPTY_IMAGE}
                width={200}
                height={240}
                preview={true}
              ></Image>
            </Col>
            <Col span={1} offset={4} className={styles.uploadBtn}>
              <Button onClick={clear}>Reset</Button>
            </Col>
            <Col span={1} offset={18} className={styles.uploadBtn}>
              <Upload
                maxCount={1}
                onChange={file => setImageBrand(file.file.originFileObj)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}></Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <Col span={16} offset={2}>
          <Form
            name="update-brand"
            id="formUpdate"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            autoComplete="off"
            className={styles.container}
          >
            <Form.Item
              label="Tên thương hiệu"
              name="brandName"
              className={styles.formItems}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên thương hiệu!',
                },
              ]}
            >
              <Input className={styles.inputItems} />
            </Form.Item>
            <Form.Item className={styles.formItems} label="Mô tả" name="brandDesc">
              <TextArea defaultValue={brand.brandDesc} className={styles.inputAreaItems} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 4,
              }}
            >
              <Button type="primary" className={styles.myButton} onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default connect()(EditBrand);
