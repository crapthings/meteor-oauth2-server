import { Card, Table, Button, Popconfirm, message } from 'antd'

const columns = [{
  title: '应用名称',
  key: 'clientName',
  dataIndex: 'clientName',
}, {
  title: '客户端 ID',
  key: 'clientId',
  dataIndex: 'clientId',
}, {
  title: '客户端密匙',
  key: 'clientSecret',
  dataIndex: 'clientSecret',
}, {
  title: '跳转链接',
  key: 'redirectUri',
  dataIndex: 'redirectUri',
}, {
  render: data => <span>
    <a href={`/clients/edit/${data._id}`}>编辑</a>
    <span className="ant-divider" />
    <Popconfirm
      title='删除该客户端会导致应用无法继续使用服务！'
      onConfirm={() => remove(data._id)}
      onCancel={cancel}
      okText='确定'
      cancelText='取消'
      placement='bottomRight'
    >
      <a href='#'>删除</a>
    </Popconfirm>
  </span>
}]

export default Container((props, onData) => {
  const loaded = Meteor.subscribe('clients').ready()
  if (loaded) {
    const clients = Clients.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch()
    onData(null, { clients })
  }
})(({ clients }) => <div className='ui-padded'>
  <Card title='客户端' extra={<a href='/clients/new'>创建</a>}>
    <Table rowKey='_id' dataSource={clients} columns={columns} />
  </Card>
</div>)

function remove(_id) {
  Meteor.call('clients.remove', _id, err => {
    if (err)
      return console.log(err)
    // message.success('删除客户端成功。')
  })
}

function cancel() {
  // message.info('用户取消了操作。')
}
