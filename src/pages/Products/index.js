import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Affix, Spin, Input, Space,Image } from 'antd';
import { PlusOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';
import ActionRender from '../../components/product/actionRender/index';
import ViewDetail from '../../components/product/viewDetail/index';
import {EMPTY_IMAGE} from '../../Utils/helper'
import Highlighter from 'react-highlight-words';
import { router } from 'umi';

const { Content, Header } = Layout;

const Product = props => {
  const { dispatch, loading } = props;
  React.useEffect(() => {
    dispatch({
      type: 'products/getProductList',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isLoading = loading.effects['products/getProductList'];
  const products = useSelector(state => state.products.products);

  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  })
  let searchInput;
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 10 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            className={styles.buttonSearch}
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          
            size="small"
            style={{ width: 50 }}
          >
            <SearchOutlined />
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 70 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleReset = clearFilters => {
    clearFilters();
    setState({ searchText: '' });
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'productId',
      align: 'left',
      width: '4%',
      sorter: (a, b) => a.productId - b.productId,
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgUrl',
      align: 'center',
      width: '4%',
      render: item => {
        return <Image width={60} height={60} src={item != '' ? item : EMPTY_IMAGE} preview={item != ''}></Image>;
      },
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName',
      align: 'center',
      width: '20%',
      ...getColumnSearchProps('productName')
    },
    {
      title: 'Phân loại',
      dataIndex: 'category',
      align: 'center',
      width: '12%',
      render: category => {
        return category.categoryName;
      },
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      align: 'center',
      width: '12%',
      render: brand => {
        return brand.brandName;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'productDesc',
      align: 'center',
      width: '25%',
      render: desc => {
        if(desc.length > 200)
        return desc.substring(0,200)+'...';
        return desc;
      },
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: text => {
        return <ActionRender item={text} showModal={showModal} dispatch={dispatch}/>;
      },
    },
  ];
  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    var mybutton = document.getElementById('myBtn');
    if (mybutton !== null) {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = 'block';
      } else {
        mybutton.style.display = 'none';
      }
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  const [isShowModal, setIsShowModal] = useState(false);
  const showModal = () => {
    setIsShowModal(true);
  };
  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Layout className={styles.layoutContainer}>
      {isLoading ? (
        <Spin />
      ) : (
        <>
        <ViewDetail onCancel={handleCancel} visible={isShowModal} />
          <Header className={styles.productHeader}>
            <span className={styles.title}>DANH SÁCH SẢN PHẨM</span>
            <Button
              type="primary"
              size="large"
              className={styles.myButtonStyling}
              onClick={() => {
                router.push('/products/create');
              }}
            >
              <PlusOutlined className={styles.plusIcon} />
              <div className={styles.myTextButton}> Tạo mới</div>
            </Button>
          </Header>
          <Content className={styles.productContent}>
            <Table
              className={styles.tableProducts}
              columns={columns}
              bordered
              dataSource={products}
            ></Table>
            <Button
              onClick={() => topFunction()}
              className={styles.topButton}
              icon={<UpOutlined />}
              id="myBtn"
            ></Button>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Product);
