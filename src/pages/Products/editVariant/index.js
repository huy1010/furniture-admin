import React, { useState } from 'react';
import styles from './styles.less';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Upload,
  Row,
  Col,
  Input,
  Typography,
  Button,
  InputNumber,
  Image,
  message,
  Spin,
  Modal,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { EMPTY_IMAGE } from '../../../Utils/helper';
import { router } from 'umi';
import { uploader } from '../../../Utils/uploader';
import TagDropDown from '../../../components/product/tagDropDown';
const EditVariant = props => {
  const { dispatch, loading } = props;
  var isLoading = false;
  var uploading = false;
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  var pathArray = window.location.pathname.split('/');
  const idProduct = pathArray[pathArray.length - 3];
  const idVariant = pathArray[pathArray.length - 1];
  const products = useSelector(state => state.products.products);
  const editProduct = products.find(item => item.productId == idProduct);
  let editVariant = editProduct.variants.find(item => (item.variantId = idVariant));
  const [state, setState] = useState({
    imgUrl: '',
    image: null,
  });
  const resetImage = () => {
    setState({
      ...state,
      imgUrl: '',
    });
  };
  React.useEffect(() => {
    setState({
      ...state,
      imgUrl: editVariant.imgUrl,
    });
    var formFill = {};
    formFill['name'] = editVariant.variantName;
    formFill['price'] = editVariant.price;
    formFill['quantity'] = editVariant.quantity;
    editVariant.attributes.forEach(item => {
      formFill[item.attributeName] = item.value;
    });
    form.setFieldsValue(formFill);
    topFunction();
  }, [editVariant.attributes, editVariant.imgUrl, editVariant.price, editVariant.quantity, editVariant.variantName, form, state]);
  const setImageVariant = async file => {
    uploading = true;
    let url = await uploader(file.file.originFileObj);
    uploading = false;
    setState({
      ...state,
      imgUrl: url,
    });
  };
  const selectTag = (tagId, attributeId, variantId) => {
    console.log(tagId, attributeId, variantId);
    editVariant.attributes.forEach(item => {
      if (item.attributeId === attributeId) item.tagId = tagId;
    });
  };
  const onFinish = values => {
    isLoading = loading.effects['products/editVariant'];
    const { name, price, quantity } = values;
    editVariant.variantId = parseInt(editVariant.variantId);
    if (name !== undefined && name !== '') editVariant.variantName = name;
    if (price !== undefined) editVariant.price = price;
    if (quantity !== undefined) editVariant.quantity = quantity;
    if (state.imgUrl !== '') editVariant.imgUrl = state.imgUrl;
    editVariant.attributes.forEach(item => {
      if (values[item.attributeName] !== undefined) item.value = values[item.attributeName];
      if (item.tagId == null) item.tagId = 0;
    });
    console.log(values);
    console.log(editVariant);
    dispatch({
      type: 'products/editVariant',
      payload: editVariant,
    });
    if (!isLoading) router.goBack();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="edit-variant"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          className={styles.container}
        >
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
            <Col span={24}>
              <Title className={styles.title}>CHỈNH SỬA PHÂN LOẠI</Title>
            </Col>
            <Col span={5}>
              <Row>
                <Col span={24} className={styles.imageContainer}>
                  <Spin spinning={uploading}>
                    <Image
                      src={
                        state.imgUrl !== ''
                          ? state.imgUrl
                          : editVariant.imgUrl != ''
                          ? editVariant.imgUrl
                          : EMPTY_IMAGE
                      }
                      className={styles.image}
                    ></Image>
                  </Spin>
                </Col>
                <Col span={11} offset={2}>
                  <Button onClick={() => resetImage()}>Reset</Button>
                </Col>
                <Col span={4} offset={6}>
                  <Upload
                    maxCount={1}
                    onChange={file => setImageVariant(file)}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}></Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                <Col span={23} offset={1}>
                  <Form.Item
                    className={styles.formItems}
                    label="TÊN PHIÊN BẢN"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền tên phiên bản !',
                      },
                      {
                        max: 100,
                        message: 'Tối đa 100 kí tự',
                      },
                    ]}
                  >
                    <Input className={styles.inputItems} />
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item className={styles.formItems} label="GIÁ BÁN" name="price">
                    <InputNumber
                      className={styles.inputNumberItems}
                      min={1000}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item className={styles.formItems} label="SỐ LƯỢNG" name="quantity">
                    <InputNumber
                      disabled={true}
                      className={styles.inputNumberItems}
                      min={0}
                      formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Title className={styles.subtitle}>CHỈNH SỬA THUỘC TÍNH</Title>
                </Col>
                <Col span={24}>
                  <Row>
                    {editVariant.attributes.map((item, index) => {
                      let attribute = editProduct.category.attributes.find(
                        att => att.attributeId == item.attributeId,
                      );
                      return (
                        <>
                          <Col span={11} offset={1}>
                            <Row>
                              <Col span={18}>
                                <Form.Item className={styles.formItems} label={item.attributeName}>
                                  <Form.Item
                                    name={item.attributeName}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Vui lòng điền ' + item.attributeName + '!',
                                      },
                                      {
                                        max: 50,
                                        message: 'Tối đa 50 kí tự',
                                      },
                                    ]}
                                  >
                                    <Input className={styles.inputItems} />
                                  </Form.Item>
                                </Form.Item>
                              </Col>
                              {item.tagId != null ? (
                                <Col span={2} offset={1}>
                                  <Form.Item className={styles.tagsItem}>
                                    <TagDropDown
                                      attributes={attribute}
                                      onSelect={(tagId, attributeId) => {
                                        selectTag(tagId, attributeId);
                                      }}
                                      defaultValue={item.tagId}
                                    />
                                  </Form.Item>
                                </Col>
                              ) : (
                                <Col span={4}></Col>
                              )}
                            </Row>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
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
                      htmlType="submit"
                      // onClick={handleAllFields}
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

export default connect(state => ({ loading: state.loading }))(EditVariant);
