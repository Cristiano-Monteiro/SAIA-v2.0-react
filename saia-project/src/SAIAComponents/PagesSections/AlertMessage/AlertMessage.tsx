import styles from './AlertMessage.module.css';

import { WarningCircle } from '@phosphor-icons/react';

interface AlertMessageInterface{
  message: string;
  colorBg: string;
};

export default function AlertMessage(AlertMessageProps: AlertMessageInterface){
  const styleContainer = {
    backgroundColor: AlertMessageProps.colorBg,
  };

  return(
    <div className={styles.container} style={styleContainer}>
      <figure className={styles.icon}>
        <WarningCircle/>
      </figure>
      <span className={styles.text}>
        {AlertMessageProps.message}
      </span>
    </div>
  );
};