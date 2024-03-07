import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input, Radio, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Settings } from './../../utils/contans';
import { adminlogin, userlogin } from '../../apis/api/api';
import Logo from './../../logo.jpg'

import styles from './index.module.scss';

const Login: React.FC = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    const { username, password, role } = values;
    try {
      setLoading(true);
      // const res: any = role === 1
      //     ? await adminlogin({
      //         username,
      //         password,
      //       })
      //     : await userlogin({
      //         username,
      //         password,
      //       });
          

      // if (res.code === 0) {
        message.success('登录成功！');
        // sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('token', 'token')
        localStorage.setItem('userInfo', JSON.stringify(values));
        navigator('/');
      // } else {
       
      //   message.error(res.msg);
      // }
    } catch (error:any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  return (
    <div id={styles.loginContainer}>
      <div className={styles.loginTop}>
        <Avatar src={Logo} className={styles.login_logo} />
        <h2>{Settings.title}</h2>
      </div>
      <Form name="normal_login" className="login-form" size="large" form={form} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
          <Input allowClear prefix={<UserOutlined />} placeholder="请输入用户名！" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input.Password prefix={<LockOutlined />} type="password" placeholder="请输入密码！" />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true, message: '请选择角色！' }]}>
          <Radio.Group>
            <Radio value={1}>管理员</Radio>
            <Radio value={2}>用户</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
