import { Card, Table, Button, Popconfirm } from 'antd'

const columns = [{
  title: '_id',
  key: '_id',
  dataIndex: '_id',
  width: 192,
}, {
  title: 'email',
  key: 'email',
  dataIndex: 'emails[0].address',
}, {
  render: data => <span>
    <a href={`/administrators/edit/${data._id}`}>编辑</a>
    <span className="ant-divider" />
    <Popconfirm
      title='确定要删除管理员吗？'
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
  const loaded = Meteor.subscribe('administrators').ready()
  if (loaded) {
    const users = Users.find({ _isOAuthAdmin: true }, {
      sort: {
        createdAt: -1
      }
    }).fetch()
    onData(null, { users })
  }
})(({ users }) => <div className='ui-padded'>
  <Card title='administrators' extra={<a href='/administrators/new'>创建</a>}>
    <Table rowKey='_id' dataSource={users} columns={columns} />
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
