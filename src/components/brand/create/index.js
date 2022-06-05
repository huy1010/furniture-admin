import React, {useState} from 'react';
import { Modal, Button, Form, Input, Image, Row, Col, Upload } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { EMPTY_IMAGE } from '../../../Utils/helper';
import { uploader } from '../../../Utils/uploader';
const CreateBrand = props => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const {dispatch} = props;
  
  const [state, setState] = useState({
     imgUrl: '',
  });
  const clear = () => {
    setState({
      ...state,
      imgUrl: '',
    });
  }
  const setImageBrand = async file => {
    let url = await uploader(file);
    setState({
      ...state,
      imgUrl: url,
    });
  }
  const handleSubmit = async () => {
    const validatedAllFields = await form.validateFields();
    const { brandName, brandDesc } = validatedAllFields;
    let brandCreate = { brandName, brandDesc };
    brandCreate.imgUrl = state.imgUrl;
    document.getElementById('formCreate').reset();
    clear();
    dispatch({
      type: 'brands/addBrand',
      payload: brandCreate
    })
    props.onCancel();
  };
  return (
    <Modal
      title="Tạo mới thương hiệu"
      className="createBrand"
      onCancel={props.onCancel}
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
                preview={false}
              ></Image>
            </Col>
            <Col span={2} offset={22} className={styles.uploadBtn}>
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
            name="create-brand"
            id='formCreate'
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
              <TextArea  className={styles.inputAreaItems} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 4,
              }}
            >
              <Button type="primary" className={styles.myButton} onClick={handleSubmit}>
                Hoàn tất
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default CreateBrand;
