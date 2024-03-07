import React from 'react'
import styles from './index.module.css'
import { useNavigate,useLocation } from 'react-router-dom';


export default function TitleText(props: any) {
  const navigator = useNavigate();
  const location = useLocation()
  return (
    <div className={styles.titleText}>
    <span className={styles.titleFirst} onClick={() => {

      if(location.pathname !== '/dashboard'){
        navigator('/')
      }
    }} >系统首页</span>
    <span>/</span>
    <span className={styles.titleSecond}>{props.title}</span>
   </div>
  )
}
