import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Input, Image,Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import styles from './styles.less';
import { EMPTY_IMAGE } from '../../Utils/helper';
import React, { useState } from 'react';
import ActionRender from '../../components/brand/actionRender';
import CreateBrand from '../../components/brand/create/index';
const { Content, Header } = Layout;

const Brand = props => {
  const brands = useSelector(state => state.brands.brands);
  
  const { loading, dispatch } = props;
  React.useEffect(() => {
    dispatch({
      type: 'brands/getBrandList',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  //delete brand
  const handleDelete = async value => {
    await dispatch({
      type: 'brands/deleteBrand',
      payload: value,
    });
  };
  let searchInput;
  const getColumnSearchProps = (dataIndex) => 
  ({
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
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
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
      dataIndex: 'brandId',
      align: 'left',
      width: '5%',
      sorter: (a, b) => a.brandId - b.brandId,
    },
    {
      title: 'Ảnh',
      dataIndex: 'imgUrl',
      align: 'center',
      width: '4%',
      render: item => {
        return (
          <Image
            width={70}
            height={60}
            src={item != '' ? item : EMPTY_IMAGE}
            preview={item != ''}
          ></Image>
        );
      },
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'brandName',
      align: 'center',
      width: '10%',
      ...getColumnSearchProps('brandName'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'brandDesc',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '10%',
      render: record => {
        return (
          <ActionRender
            dispatch={dispatch}
            handleDelete={handleDelete}
            brand={record}
          />
        );
      },
    },
  ];
  //Create
  const showModalCreate = () => {
    setIsModalVisibleCreate(true);
  };
  const handleCancel = () => {
    setIsModalVisibleCreate(false);
  };


  return (
    <Layout className={styles.layoutContainer}>
      <CreateBrand
        dispatch={dispatch}
        onCancel={handleCancel}
        visible={isModalVisibleCreate}
      />
      
      <Header className={styles.brandHeader}>
        <span className={styles.title}>DANH SÁCH THƯƠNG HIỆU</span>
        <Button
          type="primary"
          size="large"
          className={styles.myButtonStyling}
          onClick={showModalCreate}
        >
          <PlusOutlined className={styles.plusIcon} />
          <div className={styles.myTextButton}> Tạo mới</div>
        </Button>
      </Header>
      <Content className={styles.brandContent}>
        <Table
          className={styles.tableBrands}
          columns={columns}
          bordered
          dataSource={brands}
          rowKey="brandId"
        ></Table>
      </Content>
    </Layout>
  );
};
export default connect(({ brands }) => ({
  brands,
}))(Brand);