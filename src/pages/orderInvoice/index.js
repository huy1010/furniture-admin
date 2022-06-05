import styles from './index.less';
import { Table, Layout, Button } from 'antd';
import { getdateTime, moneyConverter } from '../../Utils/helper';
import Invoice from '../../components/orderInvoice/';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';

const { Content } = Layout;

const OrderInvoice = props => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className={styles.layout}>
      <div className={styles.buttonLayout}>
        <ReactToPrint
          trigger={() => (
            <Button
              className={styles.styleButton}
              style={{ backgroundColor: '#dc3545' }}
              onClick={handlePrint}
              type="primary"
            >
              Get PDF
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <Invoice data={props} ref={componentRef} />
    </div>
  );
};
export default OrderInvoice;
