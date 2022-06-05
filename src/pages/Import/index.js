import React, { useState } from 'react';
import { connect, useSelector } from 'dva';
import { Layout, Table, Button, Spin, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styles from './styles.less';
import { router } from 'umi';
import { moneyConverter } from '../../Utils/helper';
import Highlighter from 'react-highlight-words';
import ActionRender from '../../components/imports/actionRender/index';
import ViewImportDetail from '../../components/imports/ViewImportDetail';
const { Content, Header } = Layout;

const Import = props => {
  const { dispatch, loading } = props;
  React.useEffect(() => {
    dispatch({
      type: 'imports/getImports',
    });
  }, [dispatch]);
  const isLoading = loading.effects['imports/getImports'];
  const imports = useSelector(state => state.imports.imports);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [importDetails, setImportDetails] = useState([]);
  
  // Handle search 
  const [state, setState] = useState({
    searchText: '',
    searchedColumn: '',
  });
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
      dataIndex: 'importId',
      align: 'center',
      width: '4%',
      sorter: (a, b) => a.importId - b.importId,
    },
    {
      title: 'Người Nhập',
      dataIndex: 'emailImporter',
      align: 'center',
      width: '10%',
      ...getColumnSearchProps('emailImporter'),
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'createdAt',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'totalPrice',
      align: 'center',
      width: '20%',
      render: text => {
        return moneyConverter(text);
      },
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
    {
      title: 'Mô tả',
      dataIndex: 'importDesc',
      align: 'center',
      width: '15%',
    },
    {
      title: 'Hành Động',
      align: 'center',
      width: '15%',
      render: importData => {
        return (
          <div onClick={() => setImportDetails(importData)}>
            <ActionRender showModal={showModal} />
          </div>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className={styles.layoutContainer}>
      <Spin spinning={isLoading}>
        <Header className={styles.productHeader}>
          <span className={styles.title}>DANH SÁCH PHIẾU NHẬP</span>
          <Button
            type="primary"
            size="large"
            className={styles.myButtonStyling}
            onClick={() => {
              router.push('/import/create');
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
            dataSource={imports}
          ></Table>
        </Content>
        <ViewImportDetail
          visible={isModalVisible}
          onCancel={handleCancel}
          importDetails={importDetails}
        />
      </Spin>
    </Layout>
  );
};

export default connect(state => ({ loading: state.loading }))(Import);
