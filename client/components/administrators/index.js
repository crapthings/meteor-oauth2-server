import { Card, Table, Button } from 'antd'

const columns = [{
  title: '_id',
  key: '_id',
  dataIndex: '_id',
  width: 192,
}, {
  title: 'email',
  key: 'email',
  dataIndex: 'emails[0].address',
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
