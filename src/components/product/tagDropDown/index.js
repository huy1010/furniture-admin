import React, { useState } from 'react';
import { Space, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.less';
const TagDropDown = ({ attributes, onSelect, defaultValue }) => {
  const [tag, setTag] = useState('None');
  let listTag = [];
  React.useEffect(() => {
    if (defaultValue != undefined) {
      console.log(defaultValue);
      let tag = attributes.tags.find(item => item.tagId == defaultValue);
      if (tag != undefined) setTag(tag.tagName);
    }
  }, [attributes.tags, defaultValue]);
  attributes.tags.forEach(element => {
    listTag.push({
      label: element.tagName,
      key: element.tagId,
    });
  });
  listTag.push({
    label: 'None',
    key: 0,
  });
  const handleMenuClick = e => {
    onSelect(e.key, attributes.attributeId);
    let tag = listTag.find(item =>
      item.key == e.key);
    setTag(tag.label);
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {listTag.map(item => {
        return <Menu.Item key={item.key}>{item.label}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className={styles.btn}>
        <Space>
          {tag}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default TagDropDown;
