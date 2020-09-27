import { Card, Table, Button, Popconfirm, Divider, message } from 'antd'

export default () => {
  const ready = useTracker(() => Meteor.subscribe('administrators').ready(), [])
  const users = useTracker(() => Users.find({ _isOAuthAdmin: true }, { sort: { createdAt: -1 } }).fetch(), [])

  if (!ready) {
    return (
      <div>读取中</div>
    )
  }

  const remove = function (_id) {
    Meteor.call('users.remove', _id, (err) => {
      if (err) return message.error(err.reason)
      message.success('删除客户端成功')
    })
  }

  return (
    <div className='ui-padded'>
      <Card title='管理员账号' extra={<a href='/administrators/new'>创建</a>}>
        <Table rowKey='_id' dataSource={users} columns={[{
          title: '_id',
          key: '_id',
          dataIndex: '_id',
          width: 192,
        }, {
          title: '用户名',
          dataIndex: 'username',
        }, {
          title: '邮箱',
          render: (data) => _.get(data, 'emails.0.address'),
        }, {
          title: '创建日期',
          render: (data) => dayjs(data.createdAt).format('YYYY.M.D'),
        }, {
          title: '操作',
          render: (data) => (
            <span>
              <a href={`/administrators/edit/${data._id}`}>编辑</a>
              <Divider type='vertical' />
              <Popconfirm
                title='确定要删除管理员吗？'
                onConfirm={() => remove(data._id)}
                okText='确定'
                cancelText='取消'
                placement='bottomRight'
              >
                <a href='#'>删除</a>
              </Popconfirm>
            </span>
          )
        }]} />
      </Card>
    </div>
  )
}
