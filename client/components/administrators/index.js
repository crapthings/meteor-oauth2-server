import { Card, Table } from 'antd'

const columns = [{
  title: '_id',
  key: '_id',
  dataIndex: '_id',
}, {
  title: 'email',
  key: 'email',
  dataIndex: 'emails[0].address',
}]

const Index = Container((props, onData) => {
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
  <Card title='administrators'>
    <Table dataSource={users} columns={columns} />
  </Card>
</div>)

FlowRouter.route('/administrators', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'administrators',
})
