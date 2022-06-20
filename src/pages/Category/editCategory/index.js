import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import {EMPTY_IMAGE} from '../../../Utils/helper'
import { uploader } from '../../../Utils/uploader';
import {UploadOutlined } from '@ant-design/icons';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  AutoComplete,
  Tag,
  Image,
  Spin
} from 'antd';
import { router } from 'umi';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const EditCategory = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { TextArea } = Input;
  const currCategory = useSelector(state => state.category.editCategory);
  const [state, setState] = useState({
    inputVisible: false,
    inputValue: '',
    imgUrl: currCategory.imgUrl,
  });
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  React.useEffect(() => {
    var formFill = {};
     formFill['name'] = currCategory.categoryName;
     formFill['description'] = currCategory.categoryDesc;
     setState({
      ...state,
      imgUrl: currCategory.imgUrl,
    });
     form.setFieldsValue(formFill);
     topFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var isLoading = false;

  const onFill = () => {
    var formFill = {};
     formFill['name'] = '';
     formFill['description'] = '';
     form.setFieldsValue(formFill);
  }
  const clear = () => {
    setState({
      ...state,
      imgUrl: currCategory.imgUrl,
    });
  }
  const setImageCate = async file => {
    let url = await uploader(file);
    setState({
      ...state,
      imgUrl: url,
    });
  };
  const onFinish = async () => {
    let values = form.getFieldsValue();
      var newCate = {};
      newCate['categoryId'] = currCategory.categoryId;
      newCate['categoryName'] = values.name;
      newCate['categoryDesc'] = values.description;
      newCate['imgUrl'] = state.imgUrl;
      isLoading =  loading.effects[('category/editCategory')];
      dispatch({
        type: 'category/editCategory',
        payload: newCate,
      });
      if(!isLoading) router.goBack();
      onFill();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
      <Form
        name="update-category"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          description: '',
          multiSubmission: true,
          sponsors: [],
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        className={styles.container}
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={24}>
              <Title className={styles.title}>CHỈNH SỬA PHÂN LOẠI</Title>
          </Col>
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
                onChange={file => setImageCate(file.file.originFileObj)}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}></Button>
              </Upload>
            </Col>
          </Row>
        </Col>
          <Col span={16} offset={2}>
              <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                <Col span={12}>
                  <Form.Item
                    className={styles.formItems}
                    label="TÊN PHÂN LOẠI"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền tên loại sản phẩm',
                      },
                    ]}
                  >
                    <Input className={styles.inputItems} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="MÔ TẢ" name="description">
                    <TextArea className={styles.inputAreaItems} />
                  </Form.Item>
                </Col>
                <Col span={4} offset={15}>
                  <Form.Item>
                    <Button
                      className={styles.myButtonCancel}
                      onClick={() => {
                        router.goBack();
                      }}
                      size="large"
                      htmlType="button"
                    >
                      Hủy
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item>
                    <Button
                      type="primary"
                      className={styles.myButton}
                      size="large"
                       onClick={onFinish}
                      // loading={isLoading}
                    >
                      Hoàn tất
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
          </Col>
        </Row>
      </Form>
      </Spin>
    </div>
  );
};

export default connect(state => ({ loading: state.loading })) (EditCategory);
