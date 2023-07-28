import styles from './GridComponent.module.css';

import 'gridjs/dist/theme/mermaid.css';
import { Grid } from 'gridjs-react';

interface GridComponentProps{
  dataGrid: {};
  columnsGrid: {};
  paginationLimit: number;
};

export default function GridComponent(props: GridComponentProps){
  const classNameGrid = {
    container: `${styles.containerGrid}`,
    header: `${styles.headerGrid}`,
    search: `${styles.searchGrid}`,
    thead: `${styles.theadGrid}`,
    tbody: `${styles.tbodyGrid}`,
    footer: `${styles.footerGrid}`,
  };

  return(
    <>
      <Grid
        data={props.dataGrid}
        columns={props.columnsGrid}
        search={true}
        sort={true}
        pagination={{
          limit: props.paginationLimit,
        }}
        className={classNameGrid}
      />
    </>
  );
};