import './App.scss';

import { cloneDeep } from 'lodash';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
// import Layout from './component/Layout/index'

import { defaultRoutes,
  //  filepathToElement
   } from './routes';

function App() {
  const token = sessionStorage.getItem('token')
  // const cloneDefaultRoutes = cloneDeep(defaultRoutes);
  // cloneDefaultRoutes[0].children = [ ...cloneDefaultRoutes[0].children];


  const element = useRoutes(defaultRoutes);

  useEffect(() => {
    /**
     * @deprecated 权限菜单控制
     * 以下简单的示例展示管理员和普通用户的菜单渲染
     */

    if ((token as unknown as { username: string })?.username === "amdin") {
      // dispatch(setMenu([...MenuData.admin]));
    }
  }, [token]);

  return <>{element}</>;
}

export default App;
