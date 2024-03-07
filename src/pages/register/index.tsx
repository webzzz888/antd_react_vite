import { Button, Form, Input, Select, message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

const Register: React.FC = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      message.success('注册成功！');
      navigator('/login');
    } finally {
      setLoading(false);
    }
  };
  const [form] = Form.useForm();
  return (
    <div id={styles.registerContainer}>
      <div className={styles.loginTop}>
        <h2>欢迎注册 物流管理系统</h2>
      </div>
      <Form
        name="normal_register"
        size="large"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="用户名："
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input allowClear placeholder="请输入用户名！" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码："
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password type="password" placeholder="请输入密码！" />
        </Form.Item>
        <Form.Item
          name="studentCode"
          label="学号："
          rules={[{ required: true, message: '请输入学号!' }]}
        >
          <Input allowClear placeholder="请输入学号！" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="电话号码："
          rules={[{ required: true, message: '请输入电话号码!' }]}
        >
          <Input allowClear placeholder="请输入电话号码！" />
        </Form.Item>
        <Form.Item name="gender" label="角色：" rules={[{ required: true, message: '请选择角色' }]}>
          <Select placeholder="请选择角色">
            <Select.Option value="0">裁判</Select.Option>
            <Select.Option value="1">志愿者</Select.Option>
            <Select.Option value="2">参赛者</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 4 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            提交
          </Button>
          Or{' '}
          <a
            onClick={() => {
              form.resetFields();
              navigator('/login');
            }}
          >
            已有账号，去登录
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
