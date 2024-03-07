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
  InputNumber,
  Modal,
} from 'antd';
import { deleteSupplier, updateSupplier, addSupplier, getSupplierList, } from '../../apis/api/api';
import { useEffect, useState } from 'react';

const initsearchData = {
  limit: 10,
  page: 1,
  fuzeren: undefined,
  gongyingshang: undefined,
};

function Supplier() {
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
      const res: any = await getSupplierList(searchData);
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
      await deleteSupplier(ids);
      message.success('删除供应商成功！');
      initUserData();
      if (ids == selectedRowKeys) {
        setSelectedRowKeys([]);
      }
    } catch (error) {
      message.error('删除供应商失败！');
    }
  };

  const onFinish = (value: any) => {
    setSearchData(() => ({
      ...initsearchData,
      ...value,
    }));
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
  const resetData = () => {
    if (searchData.gongyingshang || searchData.fuzeren) {
      setSearchData(initsearchData);
    }
  };

  const handleSubmit = async (value: any) => {
    if (add) {
      try {
        await addSupplier(value);
        message.success('添加成功');
        initUserData();
        setDialog(false);
      } catch (error) {
        message.error('添加失败');
      }
    } else {
      try {
        await updateSupplier({
          ...value,
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
      title: '供应商',
      dataIndex: 'gongyingshang',
      key: 'gongyingshang',
    },
    {
      title: '地址',
      dataIndex: 'dizhi',
      key: 'dizhi',
    },
    {
      title: '联系电话',
      dataIndex: 'lianxidianhua',
      key: 'lianxidianhua',
    },
    {
      title: '负责人',
      dataIndex: 'fuzeren',
      key: 'fuzeren',
    },
    {
      title: '职务',
      dataIndex: 'zhiwu',
      key: 'zhiwu',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              form.setFieldsValue(record);
              setAdd(false);
              setDialog(true);
            }}
          >
            <a>修改</a>
          </Button>
          <Popconfirm
            title="是否确定删除该供应商?"
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
      {/* <TitleText title="普通供应商" /> */}

      {/* <Divider /> */}
      <Form name="basic" onFinish={onFinish} autoComplete="off" size="large">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="供应商" name="gongyingshang" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入供应商名查询" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="负责人" name="fuzeren" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入负责人查询" />
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
          style={{ marginRight: 20 }}
          onClick={() => {
            initUserData();
            setAdd(true);
            form.resetFields();
            setDialog(true);
          }}
        >
          创建供应商
        </Button>
        <Popconfirm
          title="是否确定删除选中供应商?"
          onConfirm={() => {
            if (selectedRowKeys.length) {
              handleDeleteUser(selectedRowKeys);
            } else {
              message.info('请先选择数据');
            }
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button danger size="large">
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
        title={add ? '添加普通供应商' : '修改普通供应商'}
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
            name="gongyingshang"
            label="供应商"
            rules={[
              {
                required: true,
                message: '请输入供应商名!',
              },
            ]}
          >
            <Input placeholder="请输入供应商名!" />
          </Form.Item>
          <Form.Item
            name="dizhi"
            label="地址"
            rules={[
              {
                required: true,
                message: '请输入地址!',
              },
            ]}
          >
            <Input placeholder="请输入地址!" />
          </Form.Item>
          <Form.Item
            name="fuzeren"
            label="负责人"
            rules={[
              {
                required: true,
                message: '请输入负责人!',
              },
            ]}
          >
            <Input placeholder="请输入负责人!" />
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
            name="zhiwu"
            label="职务"
            rules={[
              {
                required: true,
                message: '请输入职务!',
              },
            ]}
          >
            <Input placeholder="请输入职务!" />
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

export default Supplier;
