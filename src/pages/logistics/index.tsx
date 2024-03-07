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
  Select,
  DatePicker,
} from 'antd';
import {
  deleteLogistics,
  updateLogistics,
  addLogistics,
  getLogisticsList,
  goodsByType,
} from '../../apis/api/api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const initsearchData = {
  limit: 10,
  page: 1,
  dingdanbianhao: undefined,
  shangpinmingcheng: undefined,
};

function Logistics() {
  const [userData, setUserData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchData, setSearchData] = useState(initsearchData);
  const [dialog, setDialog] = useState(false);
  const [add, setAdd] = useState(true);
  const [form] = Form.useForm();
  const [goodsData, setGoodsData] = useState([]);

  // 获取数据
  const initUserData = async () => {
    try {
      const res: any = await getLogisticsList(searchData);
      setTotal(res.data.total);
      setUserData(res.data.list);
    } catch (error) {
      message.error('数据获取失败');
    }
  };

  // 获取商品分类
  const getGoodsByType = async () => {
    try {
      const res = await goodsByType();
      setGoodsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initUserData();
    getGoodsByType();
  }, [searchData]);

  const handleDeleteUser = async (ids: any) => {
    try {
      await deleteLogistics(ids);
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
    if (searchData.shangpinmingcheng || searchData.dingdanbianhao) {
      setSearchData(initsearchData);
    }
  };

  const handleSubmit = async (value: any) => {
    if (add) {
      try {
        await addLogistics({
          ...value,
          gengxinshijian: dayjs(value.gengxinshijian).format('YYYY-MM-DD HH:mm:ss')
        });
        message.success('添加成功');
        initUserData();
        setDialog(false);
      } catch (error) {
        message.error('添加失败');
      }
    } else {
      try {
        await updateLogistics({
          ...value,
          gengxinshijian: dayjs(value.gengxinshijian).format('YYYY-MM-DD HH:mm:ss')
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
      title: '订单编号',
      dataIndex: 'dingdanbianhao',
      key: 'dingdanbianhao',
    },
    {
      title: '商品名称',
      dataIndex: 'shangpinmingcheng',
      key: 'shangpinmingcheng',
    },
    {
      title: '商品分类',
      dataIndex: 'shangpinfenlei',
      key: 'shangpinfenlei',
    },
    {
      title: '数量',
      dataIndex: 'shuliang',
      key: 'shuliang',
    },
    {
      title: '单价',
      dataIndex: 'danjia',
      key: 'danjia',
    },
    {
      title: '总价',
      dataIndex: 'zongjia',
      key: 'zongjia',
    },
    {
      title: '下单日期',
      dataIndex: 'xiadanriqi',
      key: 'xiadanriqi',
    },
    {
      title: '备注',
      dataIndex: 'beizhu',
      key: 'beizhu',
    },
    {
      title: '物流名',
      dataIndex: 'yonghuming',
      key: 'yonghuming',
    },
    {
      title: '姓名',
      dataIndex: 'xingming',
      key: 'xingming',
    },
    {
      title: '联系电话',
      dataIndex: 'lianxidianhua',
      key: 'lianxidianhua',
    },
    {
      title: '收货地址',
      dataIndex: 'shouhuodizhi',
      key: 'shouhuodizhi',
    },
    {
      title: '物流追踪',
      dataIndex: 'wuliuzhuizong',
      key: 'wuliuzhuizong',
    },
    {
      title: '更新时间',
      dataIndex: 'gengxinshijian',
      key: 'gengxinshijian',
    },
    // {
    //   title: '点击次数',
    //   dataIndex: 'clicknum',
    //   key: 'clicknum',
    // },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <>
          <Button
            type="link"
            onClick={() => {
              form.setFieldsValue({
                ...record,
                gengxinshijian: dayjs(record.gengxinshijian),
                xiadanriqi: dayjs(record.xiadanriqi)
              });
              setAdd(false);
              setDialog(true);
            }}
          >
            <a>修改</a>
          </Button>
          <Popconfirm
            title="是否确定删除该物流?"
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
  return (
    <>
      {/* <TitleText title="普通物流" /> */}

      {/* <Divider /> */}
      <Form name="basic" onFinish={onFinish} autoComplete="off" size="large">
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="订单编号" name="dingdanbianhao" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入订单编号查询" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="商品名称" name="shangpinmingcheng" wrapperCol={{ span: 18 }}>
              <Input placeholder="请输入商品名称查询" />
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
          添加物流
        </Button>
        <Popconfirm
          title="是否确定删除选中物流?"
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
        title={add ? '添加物流' : '修改物流'}
        open={dialog}
        footer={null}
        getContainer={false}
        destroyOnClose={true}
        width={800}
        onCancel={() => setDialog(false)}
      >
        <Form
          form={form}
          size="large"
          onFinish={handleSubmit}
          style={{
            maxWidth: 800,
            marginTop: 30,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          <Form.Item name="id" label="id" hidden={true}>
            <Input placeholder="请输入id!" />
          </Form.Item>
          <Form.Item name="dingdanbianhao" label="订单编号">
              <Input placeholder="请输入订单编号!" style={{ width: 220 }} />
            </Form.Item>
            <Form.Item
              name="shangpinmingcheng"
              label="商品名称"
              rules={[
                {
                  required: true,
                  message: '请输入商品名称!',
                },
              ]}
            >
              <Input placeholder="请输入商品名称!" style={{ width: 220 }} />
            </Form.Item>
            <Form.Item name="shangpinfenlei" label="商品分类">
              <Select placeholder="请选择商品分类" style={{ width: 220 }}>
                {goodsData.map((ele: any, index: number) => {
                  return (
                    <Select.Option value={ele} key={index}>
                      {ele}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name="shuliang"
              label="数量"
              rules={[{ required: true, message: '请输入数量！' }]}
            >
              <InputNumber placeholder="请输入数量" style={{ width: 220 }} min={0} />
            </Form.Item>
            <Form.Item
              name="danjia"
              label="单价"
              rules={[{ required: true, message: '请输入单价！' }]}
            >
              <InputNumber placeholder="请输入单价" style={{ width: 220 }} min={0} />
            </Form.Item>
            <Form.Item
              name="zongjia"
              label="总价"
              rules={[{ required: true, message: '请输入总价！' }]}
            >
              <InputNumber placeholder="请输入总价" style={{ width: 220 }} min={0} />
            </Form.Item>
            <Form.Item
              name="xiadanriqi"
              label="下单日期"
              rules={[
                {
                  required: true,
                  message: '请输入下单日期!',
                },
              ]}
            >
              <DatePicker showTime style={{ width: 220 }} format={'YYYY-MM-DD hh:mm'} />
            </Form.Item>
            <Form.Item name="yonghuming" label="用户名">
              <Input placeholder="请输入用户名!" style={{ width: 220 }} />
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
              name="lianxidianhua"
              label="联系电话"
              rules={[
                { validator: validatePhoneNumber },
                {
                  required: true,
                },
              ]}
            >
              <InputNumber placeholder="请输入联系电话！" style={{ width: 220 }} />
            </Form.Item>

            <Form.Item
              name="shouhuodizhi"
              label="收货地址"
              rules={[
                {
                  required: true,
                  message: '请输入收货地址!',
                },
              ]}
            >
              <Input placeholder="请输入收货地址!" style={{ width: 220 }} />
            </Form.Item>
            <Form.Item
              name="gengxinshijian"
              label="更新时间"
            
            >
              <DatePicker showTime style={{ width: 220 }} format={'YYYY-MM-DD hh:mm'} />
            </Form.Item>
            <Form.Item name="beizhu" label="备注">
            <Input.TextArea  style={{ width: 280 }}/>
          </Form.Item>
          <Form.Item name="wuliuzhuizong" label="物流追踪">
            <Input.TextArea  style={{ width: 280 }}/>
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

export default Logistics;
