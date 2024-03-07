import React from 'react';
import {
  DashboardOutlined,
  LoginOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  StockOutlined,
  SoundOutlined,
  AlignLeftOutlined,
  HeatMapOutlined,
} from '@ant-design/icons';
import { ProConfigProvider, ProSettings } from '@ant-design/pro-components';
import ProLayout from '@ant-design/pro-layout';
import { Tooltip, Modal, Dropdown, Button, Space, Form, InputNumber, Radio, Input, message } from 'antd';
// import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useState,useEffect } from 'react';
import { Link, useLocation, useNavigate,Outlet } from 'react-router-dom';
import { treeRouter} from '../../utils/util';
import {useLocationListen  } from "./../../hooks/useLocationListen";
import { Settings } from '../../utils/contans';
import { getUserInfos,updateUserInfos,updatePas,updatePassword } from '../../apis/api/api';
import Logo from "./../../logo.jpg";
import Dashboard from "./../../pages/dashboard/index";


export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [userInfoDialog, setUserInfoDialog] = useState(false);
  const [passwordDialog, setPasswordDialog] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo')!);

  const [form] = Form.useForm();

  const baseRouterList = [
    {
      label: '首页',
      key: 'dashboard',
      path: 'dashboard',
      icon: <DashboardOutlined />,
      filepath: 'pages/dashboard/index.tsx',
      children: [
        {
          label: '人员登记管理',
          key: 'registration1',
          path: 'registration1',
          icon: <UserOutlined />,
          filepath: 'pages/user/index.tsx',
        }
      ]
    },
    userInfo.role === 1
      ? {
          label: '普通用户管理',
          key: 'user',
          path: 'user',
          icon: <UserOutlined />,
          filepath: 'pages/user/index.tsx',
        }
      : null,
    {
      label: '人员登记管理',
      key: 'registration',
      path: 'registration',
      icon: <UserOutlined />,
      filepath: 'pages/user/index.tsx',
    },
    {
      label: '食物管理',
      key: 'food',
      path: 'food',
      icon: <MenuOutlined />,
      filepath: 'pages/food/index.tsx',
    },
    {
      label: '建材管理',
      key: 'materials',
      path: 'materials',
      icon: <SoundOutlined />,
      filepath: 'pages/materials/index.tsx',
    },
    {
      label: '药品管理',
      key: 'medicine',
      path: 'medicine',
      icon: <HeatMapOutlined />,
      filepath: 'pages/medicine/index.tsx',
    },
    {
      label: '淡水管理',
      key: 'freshwater',
      path: 'freshwater',
      icon: <EnvironmentOutlined />,
      filepath: 'pages/freshwater/index.tsx',
    },
    userInfo.role === 1
      ? {
          label: '物流管理',
          key: 'logistics',
          path: 'logistics',
          icon: <StockOutlined />,
          filepath: 'pages/logistics/index.tsx',
        }
      : null,
    userInfo.role === 1
      ? {
          label: '供应商管理',
          key: 'supplier',
          path: 'supplier',
          icon: <AlignLeftOutlined />,
          filepath: 'pages/logistics/index.tsx',
        }
      : null,
  ];

    useEffect(() => {
      setPathname(location.pathname)
    }, [location]);
  const settings: ProSettings | undefined = {
    title:Settings.title,
    layout: 'mix',
  };

  const validatePhoneNumber = (
    rule: any,
    value: string,
    callback: (arg0: string | undefined) => void
  ) => {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value && !reg.test(value)) {
      callback('请输入有效的手机号码！');
    } else {
      callback(undefined);
    }
  };

  const getUserInfo = async () => {
    try {
      const res:any = await getUserInfos(userInfo.username);
      form.setFieldsValue({
        ...res?.data
      })
    } catch (error:any) {
      message.error(error.message)
    }
  };

  const handleSubmit1 = async(value: any) => {
    try {
     await updateUserInfos(value)
      message.success('修改成功')
      setUserInfoDialog(false)
     
    } catch (error:any) {
      message.error(error.message)
    }
  }

  const handleSubmit2 = async (value:any) => {
    try {
      const res = userInfo.role === 1 ? await updatePas({
        username: userInfo.username,
        password: value.password
      }) : await updatePassword({
        yonghuming: userInfo.username,
        mima: value.password
      })
      message.success('修改成功')
      navigate('/login');
    } catch (error:any) {
      message.error(error.message)
    }
  }

  

  return (
    <ProConfigProvider>
      <div
        id="admin-pro-layout"
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          fixSiderbar
          style={{
            height: '100vh',
          }}
          token={{
            header: {
              colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
            },
            sider: {
              // colorTextCollapsedButtonHover: 'red',
              // colorBgMenuItemSelected: 'blue'
            },
          }}
          logo={Logo}
          siderWidth={245}
          ErrorBoundary={false}
          route={{
            path: '/',
            routes: treeRouter([...baseRouterList]),
          }}
          {...settings}
          avatarProps={{
            size: 'small',
            icon: <UserOutlined />,
            title: <div>{userInfo?.username}</div>,
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: '1',
                        label: '个人信息',
                        onClick: () => {
                          if(userInfo.role === 2){
                            getUserInfo();
                          }
                       
                          setUserInfoDialog(true);
                        },
                      },
                      {
                        key: '2',
                        label: '修改密码',
                        onClick: () => {
                          setPasswordDialog(true);
                        },
                      },
                    ],
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          location={{
            pathname,
          }}
          
          actionsRender={() => {
            return [
              <Tooltip placement="bottom" title={'退出'}>
                <div>
                  <LoginOutlined
                    onClick={async () => {
                      sessionStorage.removeItem('token');
                      navigate('/login');
                    }}
                  />
                </div>
              </Tooltip>,
            ];
          }}
          menuItemRender={(item, dom) => {
            return (
              <Link
                to={item?.path || '/'}
                className={item.path}
                onClick={() => {
                  setPathname(item.path || '/');
                }}
              >
                {dom}
              </Link>
            );
          }}
        >

          <Outlet />
          {/* <ErrorBoundary>
            <KeepAlive include={[]} keys={[]} />
          </ErrorBoundary> */}
        </ProLayout>
        <Modal
          title="个人信息"
          open={userInfoDialog}
          onCancel={() => setUserInfoDialog(false)}
          destroyOnClose={true}
          width={600}
          footer={null}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            size="large"
            requiredMark={false}
            initialValues={{
              yonghuming: 'admin'
            }}
            onFinish={handleSubmit1}
            style={{ maxWidth: 600, marginTop: 30 }}
          >
            <Form.Item name="id" label="id" hidden={true}>
              <Input placeholder="请输入id!" />
            </Form.Item>
            <Form.Item
              name="yonghuming"
              label="用户名"
              
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input placeholder="请输入用户名!" disabled/>
            </Form.Item>
           

            {
              userInfo.role === 2 ? ( <>
              <Form.Item
                name="xingming"
                label="姓名"
                rules={[
                  {
                    required: true,
                    message: '请输入姓名!',
                  },
                ]}
              >
                <Input placeholder="请输入姓名!" />
              </Form.Item>
  
              <Form.Item
                name="xingbie"
                label="性别"
                rules={[{ required: true, message: '请输入性别！' }]}
              >
                <Radio.Group>
                  <Radio value={'男'}>男</Radio>
                  <Radio value={'女'}>女</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="nianling"
                label="年龄"
                rules={[{ required: true, message: '请输入年龄！' }]}
              >
                <InputNumber placeholder="请输入年龄！" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="lianxidianhua"
                label="联系电话"
                rules={[
                  { required: true, message: '请输入联系电话！' },
                  {
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <InputNumber placeholder="请输入联系电话！" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="guoji"
                label="国籍"
                rules={[
                  {
                    required: true,
                    message: '请输入国籍!',
                  },
                ]}
              >
                <Input placeholder="请输入国籍!" />
              </Form.Item><Form.Item
              style={{
                textAlign: 'center',
              }}
              wrapperCol={{ span: 24 }}
            >
              <Space>
                <Button
                  onClick={() => setUserInfoDialog(false)}
                  className="customCancel"
                  size="large"
                >
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  修改
                </Button>
              </Space>
            </Form.Item>
              </>): null
            }
          </Form>
        </Modal>

        <Modal
          title="修改密码"
          open={passwordDialog}
          destroyOnClose={true}
          width={600}
          onCancel={() => setPasswordDialog(false)}
          footer={null}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            size="large"
            requiredMark={false}
            onFinish={handleSubmit2}
            style={{ maxWidth: 600, marginTop: 30 }}
          >
           
            <Form.Item
              name="mima"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="password"
              label="确认密码"
              dependencies={['mima']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请输入确认密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('mima') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('你输入的密码不匹配!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              style={{
                textAlign: 'center',
              }}
              wrapperCol={{ span: 24 }}
            >
              <Space>
                <Button onClick={() => setUserInfoDialog(false)} size="large">
                  取消
                </Button>
                <Button type="primary" htmlType="submit">
                  修改
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ProConfigProvider>
  );
};
