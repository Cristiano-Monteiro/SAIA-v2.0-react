import styles from './SubjectOptions.module.css';

import { GraduationCap } from '@phosphor-icons/react';

export default function SubjectOptions(){
  const subjects = [
    'SISTEMAS DE INFORMAÇÃO',
    'CIÊNCIA DA COMPUTAÇÃO',
    'MATEMÁTICA (MANHÃ)',
    'MATEMÁTICA (TARDE)',
    'ESTATÍSTICA',
  ];

  return(
    <div className={styles.container}>
      {subjects.map((sbj, i)=>{
        return(
          <button className={styles.bttn} type="button" key={i}>
            <GraduationCap/>
            {sbj}
          </button>
        );
      })}
    </div>
  );
};