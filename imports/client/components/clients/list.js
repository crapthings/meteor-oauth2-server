import { Card, Table, Button, Popconfirm, Divider, message } from 'antd'

export default () => {
  const ready = useTracker(() => Meteor.subscribe('clients').ready(), [])
  const clients = useTracker(() => Clients.find({}, { sort: { createdAt: -1 } }).fetch(), [])

  if (!ready) {
    return (
      <div>读取中</div>
    )
  }

  const remove = function (_id) {
    Meteor.call('clients.remove', _id, err => {
      if (err) return message.error(err.reason)
      message.success('客户端删除成功')
    })
  }

  return (
    <div className='ui-padded'>
      <Card title='客户端' extra={<a href='/clients/new'>创建</a>}>
        <Table rowKey='_id' dataSource={clients} columns={[{
          title: '应用名称',
          key: 'clientName',
          dataIndex: 'clientName',
        }, {
          title: '客户端 ID',
          dataIndex: 'clientId',
        }, {
          title: '客户端密匙',
          dataIndex: 'clientSecret',
        }, {
          title: '跳转链接',
          dataIndex: 'redirectUri',
        }, {
          render: (data) => (
            <span>
              <a href={`/clients/edit/${data._id}`}>编辑</a>
              <Divider type='vertical' />
              <Popconfirm
                title='删除该客户端会导致应用无法继续使用服务！'
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
