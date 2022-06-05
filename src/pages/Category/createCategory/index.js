import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.less';
import { TweenOneGroup } from 'rc-tween-one';
import { connect, useSelector } from 'dva';
import {
  Affix,
  Form,
  Modal,
  Row,
  Col,
  Input,
  Typography,
  Button,
  Image,
  Tag,
  Upload,
  AutoComplete,
  Spin,
} from 'antd';
import { ExclamationCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { router } from 'umi';
import { EMPTY_IMAGE } from '../../../Utils/helper';
import { uploader } from '../../../Utils/uploader';
const CreateCategory = props => {
  const { dispatch, loading } = props;
  const [form] = Form.useForm();
  const { Title } = Typography;
  const [state, setState] = useState({
    imgUrl: '',
    options: [],
    inputVisible: false,
    inputValue: '',
    attributeOptions: [],
    attributes: [],
  });
  const [attributeOptions, setAttributeOptions] = useState([]);
  const lstAttribute = useSelector(state => state.category.attributes);
  var isLoading = false;
  const searchResult = value => {
    let result = lstAttribute.filter(item =>
      item.attributeName.toUpperCase().includes(value.toUpperCase()),
    );
    return result.map((item, index) => {
      return {
        value: item.attributeId,
        label: <span>{item.attributeName}</span>,
      };
    });
  };
  //handle upload image
  const setImageCategory = async file => {
    let url = await uploader(file);
    setState({
      ...state,
      imgUrl: url,
    });
  };
  //handle autocomplete
  const onSelectAttribute = value => {
    const attribute = lstAttribute.find(item => item.attributeId == value);
    let { options, attributes } = state;
    if (attribute.attributeName && options.indexOf(attribute.attributeName) === -1) {
      options = [...options, attribute.attributeName];
      attributes = [...attributes, attribute];
    }
    setState(state => ({
      ...state, // <-- shallow copy previous state
      options,
      attributes,
      inputVisible: false,
      inputValue: '',
    }));
  };
  const handleSearchAttribute = value => {
    setAttributeOptions(value ? searchResult(value) : []);
  };

  const removeOption = option => {
    const temps = state.options.filter(item => item != option);
    const cc = state.attributes.filter(item => item.attributeName != option);
    setState({
      attributes: cc,
      options: temps,
    });
  };
  const showInput = () => {
    setState({
      ...state,
      inputVisible: true,
    });
  };
  const inputRef = useRef(null);
  const saveInputRef = input => {
    inputRef.current = input;
  };
  useEffect(() => {
    if (state.inputVisible) {
      inputRef.current.focus();
    }
  }, [state]);

  const handleInputChange = text => {
    setState({
      ...state,
      inputValue: text,
    });
  };
  const forMap = tag => {
    const tagElem = (
      <Tag
        className={styles.tagItem}
        closable
        onClose={() => {
          removeOption(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block', marginBottom: '10px' }}>
        {tagElem}
      </span>
    );
  };

  const onFill = () => {
    var formFill = {};
    formFill['name'] = '';
    formFill['description'] = '';
    formFill['parent'] = '';
    setState({
      ...state,
      options: [],
      parentId: [],
    });
    form.setFieldsValue(formFill);
  };
  function confirm() {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn không thể chỉnh sửa các thuộc tính, vẫn tiếp tục?',
      onOk: () => {
        onFinish();
      },
      okText: 'OK',
      cancelText: 'Hủy',
    });
  }
  const onFinish = async () => {
    var newCate = {};
    let values = form.getFieldValue();
    newCate.categoryName = values.categoryName;
    newCate.categoryDesc = values.categoryDesc;
    newCate.attributes = state.attributes;
    newCate.imgUrl = state.imgUrl;

    isLoading = loading.effects['category/addCategory'];
    dispatch({
      type: 'category/addCategory',
      payload: newCate,
    });
    if (!isLoading) router.goBack();
    onFill();
  };
  return (
    <div>
      <Spin spinning={isLoading}>
        <Form
          name="create-category"
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
              <Affix offsetTop={70}>
                <Title className={styles.title}>THÊM PHÂN LOẠI MỚI</Title>
              </Affix>
            </Col>
            <Col span={16}>
              <Affix offsetTop={130}>
                <Row gutter={[{ xs: 8, sm: 16, md: 24 }]}>
                  <Col span={5}>
                    <Row>
                      <Col span={24}>
                        <Image
                          src={state.imgUrl !== '' ? state.imgUrl : EMPTY_IMAGE}
                          width={200}
                          height={240}
                          preview={false}
                        ></Image>
                      </Col>
                      <Col span={2} offset={16} className={styles.uploadBtn}>
                        <Upload
                          maxCount={1}
                          onChange={file => setImageCategory(file.file.originFileObj)}
                          showUploadList={false}
                        >
                          <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={15} offset={4}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          className={styles.formItems}
                          label="TÊN PHÂN LOẠI"
                          name="categoryName"
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
                        <Form.Item className={styles.formItems} label="MÔ TẢ" name="categoryDesc">
                          <Input className={styles.inputItems} />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item className={styles.formItems} label="THUỘC TÍNH" name="options">
                          <TweenOneGroup
                            enter={{
                              scale: 0.8,
                              opacity: 0,
                              type: 'from',
                              duration: 100,
                            }}
                            onEnd={e => {
                              if (e.type === 'appear' || e.type === 'enter') {
                                e.target.style = 'display: inline-block';
                              }
                            }}
                            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                            appear={false}
                          >
                            {state.options.map(item => {
                              return forMap(item);
                            })}
                          </TweenOneGroup>
                        </Form.Item>
                        {state.inputVisible && (
                          <AutoComplete
                            dropdownMatchSelectWidth={120}
                            style={{ width: 170 }}
                            options={attributeOptions}
                            onSelect={onSelectAttribute}
                            onSearch={handleSearchAttribute}
                          >
                            <Input
                              className={styles.inputOptions}
                              ref={saveInputRef}
                              type="text"
                              size="small"
                              style={{ width: 170 }}
                              value={state.inputValue}
                              onChange={e => {
                                handleInputChange(e.target.value);
                              }}
                            />
                          </AutoComplete>
                        )}
                        {!state.inputVisible && (
                          <Tag onClick={() => showInput()} className={styles.siteTagPlus}>
                            <PlusOutlined /> Thuộc tính mới
                          </Tag>
                        )}
                      </Col>
                      <Col span={4} offset={12}>
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
                      <Col span={3} offset={2}>
                        <Form.Item>
                          <Button
                            type="primary"
                            className={styles.myButton}
                            size="large"
                            onClick={confirm}
                            // loading={isLoading}
                          >
                            Hoàn tất
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Affix>
            </Col>
          </Row>
        </Form>
      </Spin>
    </div>
  );
};

export default connect(state => ({ loading: state.loading }))(CreateCategory);
