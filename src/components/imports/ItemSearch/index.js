import React from 'react'
import { Image } from 'antd';
import styles from './styles.less';
const ItemSearch = props => {
    const {url, name,onClick } = props;
  return (
    <div className={styles.itemContainer} onClick={onClick}>
      <Image className={styles.avatar} src={url} width={40} preview ={false}/>
    <div className={styles.infor}>
      <p className={styles.name}>{name}</p>
    </div>
   </div>
  )
}

export default ItemSearch