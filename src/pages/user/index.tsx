import TitleText from '@/component/Title';
import {
  Space,
  Table,
  Form,
  Input,
  Button,
  Row,
  Col,
  Popconfirm,
  message,
  Radio,
  InputNumber,
  Modal,
} from 'antd';
import { getUserList,addUser,updateUser,deleteUser } from '../../apis/api/api';
import { useEffect, useState, } from 'react';


const initsearchData = {
  limit: 10,
  page: 1,
  yonghuming: undefined,
};

function User() {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchData, setSearchData] = useState(initsearchData);
  const [dialog, setDialog] = useState(false);
  const [add, setAdd] = useState(true);
  const [form] = Form.useForm();
  

  // 获取数据
  const initUserData = async () => {
    try {
      const res: any = await getUserList(searchData);
      setTotal(res.data.total);
      setUserData(res.data.list);
    } catch (error) {
      message.error('数据获取失败');
    }
  };
  useEffect(() => {
    initUserData();
  }, [searchData]);

  const handleDeleteUser = async (ids: any) => {
    try {
      await deleteUser(ids);
      message.success('删除用户成功！');
      initUserData();
      if(ids == selectedRowKeys){
        setSelectedRowKeys([])
      }
    } catch (error) {
      message.error('删除用户失败！');
    }
  };

  const onFinish = (value: any) => {
    setSearchData(() => ({
      ...initsearchData,
      ...value,
    }));
  };
  const validatePhoneNumber = (rule: any, value: string, callback: (arg0: string | undefined) => void) => {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value && !reg.test(value)) {
      callback('请输入有效的手机号码！');
    } else {
      callback(undefined);
    }
  };
  const resetData = () => {
    if (searchData.yonghuming) {
      setSearchData(initsearchData);
    }
  };

  const handleSubmit = async (value: any) => {
    if (add) {
      try {
        await addUser(value);
        message.success('添加成功');
        initUserData();
        setDialog(false);
      } catch (error:any) {
        message.error(error.message);
      }
    } else {
      try {
        await updateUser({
          ...value
        });
        initUserData();
        setDialog(false);
        message.success('修改成功');
      } catch (error) {
        message.error('修改失败');
      }
    }
  };

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'yonghuming',
      key: 'yonghuming',
    },
    {
      title: '用户编号',
      dataIndex: 'yonghubianhao',
      key: 'yonghubianhao',
    },
    {
      title: '姓名',
      dataIndex: 'xingming',
      key: 'xingming',
    },
    {
      title: '性别',
      dataIndex: 'xingbie',
      key: 'xingbie',
    },
    {
      title: '联系电话',
      key: 'lianxidianhua',
      dataIndex: 'lianxidianhua',
    },
    {
      title: '年龄',
      key: 'nianling',
      dataIndex: 'nianling',
    },
    {
      title: '创建时间',
      key: 'addtime',
      dataIndex: 'addtime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <>
        <Button
            type="link"
            onClick={() => {
              form.setFieldsValue(record)
              setAdd(false);
              setDialog(true);
            }}
          >
            <a>修改</a>
          </Button>
        <Popconfirm
          title="是否确定删除该用户?"
          onConfirm={() => handleDeleteUser([record.id])}
          okText="确定"
          cancelText="取消"
        >
          {record.username !== 'admin' ? (
            <Button type="link" danger size="small">
              删除
            </Button>
          ) : null}
        </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <>
      {/* <TitleText title="普通用户" /> */}
      
      {/* <Divider /> */}
      <Form name="basic" onFinish={onFinish} autoComplete="off" size="large">
        <Row gutter={24}>
          <Col span={16}>
            <Form.Item label="用户名" name="yonghuming" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入用户名查询" />
            </Form.Item>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Form.Item wrapperCol={{ span: 22 }}>
              <Space>
                <Button htmlType="reset" size="large" onClick={resetData}>
                  重置
                </Button>
                <Button type="primary" htmlType="submit" size="large">
                  搜索
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div
        style={{
          height: 50,
        }}
      >
        <Button
          size="large"
          type="primary"
          style={{marginRight: 20}}
          onClick={() => {
            initUserData();
            setAdd(true);
            form.resetFields();
            setDialog(true);
          }}
        >
          创建用户
        </Button>
        <Popconfirm
          title="是否确定删除选中用户?"
          onConfirm={() => {
            if(selectedRowKeys.length){
              handleDeleteUser(selectedRowKeys)
            }else{
              message.info('请先选择数据')
            }
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button  danger  size="large">
              批量删除
            </Button>
        </Popconfirm>
      </div>
      <Table
        columns={columns}
        dataSource={userData}
        bordered
        rowSelection={rowSelection}
        rowKey={(record: any) => record.id}
        pagination={{
          onChange: (val) => {
            setSearchData({
              ...searchData,
              page: val,
            });
          },
          pageSize: searchData.limit,
          total,
          current: searchData.page,
        }}
      />

      <Modal
        title={add ? '添加普通用户' : '修改普通用户'}
        open={dialog}
        footer={null}
        destroyOnClose={true}
        width={600}
        onCancel={() => setDialog(false)}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          size="large"
          onFinish={handleSubmit}
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
            <Input placeholder="请输入用户名!" />
          </Form.Item>
          <Form.Item
            name="yonghubianhao"
            label="用户编号"
            rules={[
              {
                required: true,
                message: '请输入用户编号!',
              },
            ]}
          >
            <Input placeholder="请输入用户编号!" />
          </Form.Item>
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
            name="mima"
            label="密码"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
           <Input placeholder="请输入密码!" />
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
            rules={[{ required: true, message: '请输入联系电话！' },{
              validator: validatePhoneNumber
            }]}
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
          </Form.Item>
         
         
          <Form.Item
            style={{
              textAlign: 'center',
            }}
            wrapperCol={{ span: 24 }}
          >
            <Space>
              <Button onClick={() => setDialog(false)} className="customCancel" size="large">
                取消
              </Button>
              {add ? (
                <Button type="primary" htmlType="submit" className="customSure" size="large">
                  确定
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  修改
                </Button>
              )}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default User;
