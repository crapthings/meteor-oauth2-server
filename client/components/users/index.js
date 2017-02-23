import { Card, Table } from 'antd'

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

const Index = Container((props, onData) => {
  const loaded = Meteor.subscribe('users').ready()
  if (loaded) {
    const users = Users.find({ _isOAuthAdmin: { $exists: false } }, {
      sort: {
        createdAt: -1
      }
    }).fetch()
    onData(null, { users })
  }
})(({ users }) => <div className='ui-padded'>
  <Card title='用户账号'>
    <Table dataSource={users} columns={columns}></Table>
  </Card>
</div>)

FlowRouter.route('/users', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'users',
})
