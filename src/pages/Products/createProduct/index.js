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
  message,
  AutoComplete,
} from 'antd';
import { InboxOutlined, UploadOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import TagDropDown from '../../../components/product/tagDropDown';
import { router } from 'umi';
import { uploader } from '../../../Utils/uploader';
const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
const CreateProduct = props => {
  const { dispatch } = props;
  let productTemp = {
    productName: '',
    imgUrl: '',
    brandId: 0,
    productDesc: '',
    categoryId: 0,
    variants: [],
  };
  const categories = useSelector(state => state.category.categories);
  const brands = useSelector(state => state.brands.brands);
  const [state, setState] = useState({
    newProduct: productTemp,
    optionsCate: [],
    optionsBrand: [],
    isSelectCate: false,
    isSelectBrand: false,
    variant: {
      variantName: '',
      sku: '',
      price: '',
      imgUrl: '',
      attributes: [],
    },
  });

  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  //handle search category
  const searchResultCate = value => {
    let result = categories.filter(item =>
      item.categoryName.toUpperCase().includes(value.toUpperCase()),
    );
    return result.map((item, index) => {
      return {
        value: item.categoryName,
        label: <span>{item.categoryName}</span>,
      };
    });
  };
  const handleSearchCate = value => {
    setState({
      ...state,
      optionsCate: value ? searchResultCate(value) : [],
    });
  };
  const onSelectCate = value => {
    let result = categories.find(item => item.categoryName.toUpperCase() === value.toUpperCase());
    let temp = state.variant;
    temp.attributes = result.attributes;
    temp.attributes.forEach(item => {
      item['value'] = '';
      item['tagId'] = 0;
    });
    let product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants = [];
    product.categoryId = result.categoryId;
    setState({
      ...state,
      isSelectCate: true,
      variant: temp,
      newProduct: product,
    });
  };
  //handle search brand
  const searchResultBrand = value => {
    let result = brands.filter(item => item.brandName.toUpperCase().includes(value.toUpperCase()));
    return result.map((item, index) => {
      return {
        value: item.brandName,
        label: <span>{item.brandName}</span>,
      };
    });
  };
  const handleSearchBrand = value => {
    setState({
      ...state,
      optionsBrand: value ? searchResultBrand(value) : [],
    });
  };
  const onSelectBrand = value => {
    let result = brands.find(item => item.brandName.toUpperCase() === value.toUpperCase());
    let product = JSON.parse(JSON.stringify(state.newProduct));
    product.brandId = result.brandId;
    setState({
      ...state,
      newProduct: product,
    });
  };
  const onClickAddVariant = () => {
    if (!state.isSelectCate) {
      message.warning('Vui lòng chọn loại sản phẩm!');
    } else {
      let temp = state.newProduct;
      let arr = state.newProduct.variants;
      arr.push(state.variant);
      temp.variants = arr;
      setState({
        ...state,
        newProduct: temp,
      });
    }
  };
  const onDelete = index => {
    let temp = state.newProduct;
    let arr = state.newProduct.variants;
    arr.splice(index, 1);
    temp.variants = arr;
    setState({
      ...state,
      newProduct: temp,
    });
    // document.getElementById('formCreate').reset();
    onFill();
  };

  const onFill = () => {
    var product = state.newProduct;
    var formfill = {};
    product.variants.forEach((variant, index) => {
      if (variant.sku !== '') {
        let field = 'variant_sku' + index;
        formfill[field] = variant.sku;
      }
      if (variant.variantNamevariantName !== '') {
        let field = 'variant_variantName' + index;
        formfill[field] = variant.variantName;
      }
      if (variant.price !== '') {
        let field = 'variant_price' + index;
        formfill[field] = variant.price;
      }
      variant.attributes.forEach(option => {
        let field = 'attributes' + option.attributeName + index;
        formfill[field] = option.value;
      });
    });
    form.setFieldsValue(formfill);
  };
  const onValuesChange = values => {
    let flagEdit = false;
    const field = Object.keys(values)[0];
    var product = state.newProduct;

    if (field === 'productName') {
      flagEdit = true;
      product.productName = values[field];
    }
    if (field === 'productDesc') {
      flagEdit = true;
      product.productDesc = values[field];
    }
    if (field.slice(0, 7) === 'variant') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index][field.slice(8, -1)] = values[field];
    }
    if (field.slice(0, 10) === 'attributes') {
      flagEdit = true;
      let index = parseInt(field.slice(-1));
      product.variants[index].attributes.forEach(option => {
        if (option.attributeName === field.slice(11, -1)) {
          option.value = values[field];
        }
      });
    }
    if (flagEdit) {
      setState({
        ...state,
        newProduct: product,
      });
    }
    console.log(state.newProduct);
  };
  const setImageProduct = async file => {
    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.imgUrl = await uploader(file.file.originFileObj);
    setState({
      ...state,
      newProduct: product,
    });
  };
  const setImageVariant = async (file, index) => {
    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants[index].imgUrl = await uploader(file.file.originFileObj);
    setState({
      ...state,
      newProduct: product,
    });
  };
  const selectTag = (tagId, attributeId, variantId) => {

    var product = JSON.parse(JSON.stringify(state.newProduct));
    product.variants[variantId].attributes.forEach(attribute => {
      if (attribute.attributeId == attributeId) {
        attribute.tagId = parseInt(tagId);
      }
    }); 
    setState({
      ...state,
      newProduct: product,
    });
  }
  // validation before submit
  const validator = product => {
    let show = false;
    let result = true;
    if (product.brandId < 1) {
      message.error(`Thương hiệu sản phẩm không tồn tại`);
      result = false;
    }
    if (product.categoryId < 1 && !show) {
      message.error(`Phân loại sản phẩm không tồn tại`);
      result = false;
      show = true;
    }
    if (product.variants.length < 1 && !show) {
      message.error(`Thêm ít nhất một phiên bản`);
      result = false;
      show = true;
    }
    return result;
  };
  //submit
  const onFinish = async values => {
   await form.validateFields();
    if (validator(state.newProduct)) {
      dispatch({
        type: 'products/addProduct',
        payload: state.newProduct,
      });
      console.log(state.newProduct);
     // router.goBack();
    }
   
  };
  return (
    <div>
      <Form
        name="create-product"
        labelCol={{
          span: 12,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="vertical"
        form={form}
        autoComplete="off"
        id="formCreate"
        onFinish={onFinish}
        className={styles.container}
        onValuesChange={onValuesChange}
      >
        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }]}>
          <Col span={6}>
            <Affix offsetTop={70}>
              <Title className={styles.title}>THÊM SẢN PHẨM MỚI</Title>
            </Affix>
          </Col>
          <Col span={5} offset={13}>
            <Button
              type="primary"
              className={styles.buttonAddVariant}
              size="medium"
              onClick={onClickAddVariant}
              // loading={isLoading}
            >
              Thêm phiên bản
            </Button>
          </Col>
          <Col span={9}>
            <Affix offsetTop={130}>
              <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="TÊN SẢN PHẨM">
                    <Form.Item
                      name="productName"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền tên sản phẩm!',
                        },
                        {
                          max: 100,
                          message: 'Tối đa 100 kí tự',
                        },
                      ]}
                    >
                      <Input className={styles.inputItems} />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={13}>
                  <Form.Item className={styles.formItems} label="LOẠI SẢN PHẨM">
                    <Form.Item
                      name="product_category"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền loại sản phẩm!',
                        },
                      ]}
                    >
                      <AutoComplete
                        className="complete"
                        options={state.optionsCate}
                        onSelect={onSelectCate}
                        onSearch={handleSearchCate}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item className={styles.formItems} label="THƯƠNG HIỆU">
                    <Form.Item
                      name="product_brand"
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng điền thương hiệu sản phẩm!',
                        },
                      ]}
                    >
                      <AutoComplete
                        className="complete"
                        options={state.optionsBrand}
                        onSelect={onSelectBrand}
                        onSearch={handleSearchBrand}
                      />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="MÔ TẢ" name="productDesc">
                    <TextArea className={styles.inputItems} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item className={styles.formItems} label="HÌNH ẢNH CHÍNH">
                    <Form.Item
                      className={styles.formItems}
                      name="product_image"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng thêm hình ảnh sản phẩm!',
                        },
                      ]}
                    >
                      <Upload.Dragger
                        name="files"
                        action="/upload.do"
                        onChange={file => setImageProduct(file)}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                      </Upload.Dragger>
                    </Form.Item>
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
                      htmlType="submit"
                      // onClick={handleAllFields}
                      // loading={isLoading}
                    >
                      Hoàn tất
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Affix>
          </Col>
          <Col span={14}>
            <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
              {state.newProduct.variants.map((item, index) => {
                let name_image = 'image_variant' + index;
                return (
                  <Col span={24} className={styles.variantContainer}>
                    <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                      {Object.entries(item).map(key => {
                        let label = 'variant_' + key[0] + index;
                        if (key.includes('sku'))
                          return (
                            <Col span={24}>
                              <Row>
                                <Col span={9}>
                                  <Form.Item className={styles.formItems} label="MÃ NHẬP HÀNG">
                                    <Form.Item
                                      className={styles.formVariantItems}
                                      name={label}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Vui lòng điền mã nhập sản phẩm!',
                                        },
                                        {
                                          max: 20,
                                          message: 'Tối đa 20 kí tự',
                                        },
                                      ]}
                                    >
                                      <Input className={styles.inputVariantName} />
                                    </Form.Item>
                                  </Form.Item>
                                </Col>
                                <Col span={14}>
                                  <Form.Item className={styles.formItems} label="TÊN PHIÊN BẢN">
                                    <Form.Item
                                      className={styles.formVariantItems}
                                      name={'variant_variantName' + index}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Vui lòng điền tên nhập sản phẩm!',
                                        },
                                        {
                                          max: 50,
                                          message: 'Tối đa 50 kí tự',
                                        },
                                      ]}
                                    >
                                      <Input className={styles.inputVariantItems} />
                                    </Form.Item>
                                  </Form.Item>
                                </Col>
                                <Col span={1}>
                                  <CloseOutlined
                                    className={styles.iconDelete}
                                    onClick={() => onDelete(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          );

                        if (key.includes('price'))
                          return (
                            <Col span={10}>
                              <Form.Item className={styles.formVariantItems} label="Giá bán">
                                <Form.Item
                                  className={styles.formVariantItems}
                                  name={label}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng nhập giá bán!',
                                    },
                                    {
                                      pattern: /^(?:\d*)$/,
                                      message: 'Vui lòng nhập số',
                                    },
                                    {
                                      max: 20,
                                      message: 'Tối đa 20 kí tự',
                                    },
                                  ]}
                                >
                                  <Input className={styles.inputVariantItems} />
                                </Form.Item>
                              </Form.Item>
                            </Col>
                          );
                        if (key.includes('attributes')) {
                          let temp = key[1];
                          return (
                            <Col span={24}>
                              <Row>
                                {temp.map(option => {
                                  let label = 'attributes_' + option.attributeName + index;
                                  return (
                                    <>
                                      <Col span={11} offset={1}>
                                        <Row>
                                          <Col span={19}>
                                            <Form.Item
                                              className={styles.formVariantItems}
                                              label={option.attributeName}
                                            >
                                              <Form.Item
                                                className={styles.formVariantItems}
                                                rules={[
                                                  {
                                                    required: true,
                                                    message:
                                                      'Vui lòng nhập ' + option.attributeName + '!',
                                                  },
                                                  {
                                                    max: 50,
                                                    message: 'Tối đa 50 kí tự',
                                                  },
                                                ]}
                                                name={label}
                                              >
                                                <Input className={styles.inputVariantItems} />
                                              </Form.Item>
                                            </Form.Item>
                                          </Col>
                                          {option.tags.length > 0 ? <Col span={2}>
                                            <Form.Item className={styles.tagsItem}>
                                              <TagDropDown attributes={option} onSelect={(tagId,attributeId)=> {selectTag(tagId,attributeId,index)}} />
                                            </Form.Item>
                                          </Col> : <Col span={4}></Col>}
                                        </Row>
                                      </Col>
                                    </>
                                  );
                                })}
                              </Row>
                            </Col>
                          );
                        }
                      })}
                      <Col span={24}>
                        <Form.Item className={styles.formItems} label="Hình ảnh phiên bản">
                          <Form.Item
                            name={name_image}
                            rules={[
                              {
                                required: true,
                                message: 'Vui lòng thêm hình ảnh!',
                              },
                            ]}
                          >
                            <Upload
                              // fileList={item.image_file}
                              listType="picture"
                              maxCount={1}
                              onChange={file => setImageVariant(file, index)}
                            >
                              <Button
                                className={styles.uploader}
                                size="middle"
                                icon={<UploadOutlined />}
                              >
                                Image
                              </Button>
                            </Upload>
                          </Form.Item>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default connect()(CreateProduct);
