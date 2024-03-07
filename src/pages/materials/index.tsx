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
import { deleteMaterials, updateMaterials, addMaterials, getMaterialsList } from '../../apis/api/api';
import { useEffect, useState } from 'react';

const initsearchData = {
  limit: 10,
  page: 1,
  jiancaibianhao: undefined,
  jiancaimingcheng: undefined,
};

function Materials() {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchData, setSearchData] = useState(initsearchData);
  const [dialog, setDialog] = useState(false);
  const [add, setAdd] = useState(true);
  const [form] = Form.useForm();
  const userInfo = JSON.parse(localStorage.getItem("userInfo")!)

 

  // 获取数据
  const initUserData = async () => {
    try {
      const res: any = await getMaterialsList(searchData);
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
      await deleteMaterials(ids);
      message.success('删除成功！');
      initUserData();
      if (ids == selectedRowKeys) {
        setSelectedRowKeys([]);
      }
    } catch (error) {
      message.error('删除失败！');
    }
  };

  const onFinish = (value: any) => {
    setSearchData(() => ({
      ...initsearchData,
      ...value,
    }));
  };

  const resetData = () => {
    if (searchData.jiancaibianhao || searchData.jiancaimingcheng) {
      setSearchData(initsearchData);
    }
  };

  const handleSubmit = async (value: any) => {
    if (add) {
      try {
        await addMaterials(value);
        message.success('添加成功');
        initUserData();
        setDialog(false);
      } catch (error) {
        message.error('添加失败');
      }
    } else {
      try {
        await updateMaterials({
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
      title: '建材编号',
      dataIndex: 'jiancaibianhao',
      key: 'jiancaibianhao',
    },
    {
      title: '建材名称',
      key: 'jiancaimingcheng',
      dataIndex: 'jiancaimingcheng',
    },
    {
      title: '建材数量(吨)',
      dataIndex: 'jiancaishuliang',
      key: 'jiancaishuliang',
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
              form.setFieldsValue(record);
              setAdd(false);
              setDialog(true);
            }}
          >
            <a>修改</a>
          </Button>
          <Popconfirm
            title="是否确定删除该建材?"
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
    }
  ];

  // useEffect(() => {
  //   console.log(userInfo.role)
  //   if(userInfo.role === 1){
  //     columns.push(operate)
  //   }
  // },[])

  return (
    <>
      {/* <TitleText title="普通用户" /> */}

      {/* <Divider /> */}
      <Form name="basic" onFinish={onFinish} autoComplete="off" size="large">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="建材名称" name="jiancaimingcheng" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入建材名称查询" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="建材编号" name="jiancaibianhao" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入建材编号查询" />
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
      {
        userInfo.role === 1 ? <div
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
          添加建材
        </Button>
        <Popconfirm
          title="是否确定删除选中建材?"
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
      </div>: null
      }
      <Table
        columns={userInfo.role === 1 ? columns : columns.slice(0,columns.length -1)}
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
        title={add ? '添加建材' : '修改建材'}
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
            name="jiancaibianhao"
            label="建材编号"
            rules={[
              {
                required: true,
                message: '请输入建材编号!',
              },
            ]}
          >
            <Input placeholder="请输入建材编号!" />
          </Form.Item>
          <Form.Item
            name="jiancaimingcheng"
            label="建材名称"
            rules={[
              {
                required: true,
                message: '请输入建材名称!',
              },
            ]}
          >
            <Input placeholder="请输入建材名称!" />
          </Form.Item>
          <Form.Item
            name="jiancaishuliang"
            label="建材数量"
            rules={[
              {
                required: true,
                message: '请输入建材数量!',
              },
            ]}
          >
            <InputNumber
              placeholder="请输入建材数量!"
              style={{ width: '100%' }}
              min={0}
              addonAfter={'吨'}
            />
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

export default Materials;
