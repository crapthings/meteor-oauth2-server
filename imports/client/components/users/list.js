import { Card, Table, Button, Popconfirm, Divider, message } from 'antd'

export default () => {
  const ready = useTracker(() => Meteor.subscribe('users').ready(), [])
  const users = useTracker(() => Users.find({ _isOAuthAdmin: { $exists: false } }, { sort: { createdAt: -1 } }).fetch(), [])

  if (!ready) {
    return (
      <div>读取中</div>
    )
  }

  const remove = function (_id) {
    Meteor.call('users.remove', _id, err => {
      if (err) return message.success(err.reason)
      message.success('用户账号删除成功')
    })
  }

  return (
    <div className='ui-padded'>
      <Card title='用户账号' extra={<a href='/users/new'>创建</a>}>
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
          dataIndex: 'emails',
          render: (data) => data[0]?.address,
        }, {
          title: '创建时间',
          dataIndex: 'createdAt',
          width: 192,
          render: (data) => dayjs(data).format('YYYY.M.D'),
        }, {
          title: '操作',
          render: (data) => (
            <span>
              <a href={`/users/edit/${data._id}`}>编辑</a>
              <Divider type='vertical' />
              <Popconfirm
                title='确定删除该用户账号吗？'
                onConfirm={() => remove(data._id)}
                okText='确定'
                cancelText='取消'
                placement='bottomRight'
              >
                <a href='#'>删除</a>
              </Popconfirm>
            </span>
          )
        }]}></Table>
      </Card>
    </div>
  )
}
