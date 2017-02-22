import { Card, Table } from 'antd'

const columns = [{
  title: '_id',
  key: '_id',
  dataIndex: '_id',
}, {
  title: 'clientName',
  key: 'clientName',
  dataIndex: 'clientName',
}, {
  title: 'clientId',
  key: 'clientId',
  dataIndex: 'clientId',
}, {
  title: 'clientSecret',
  key: 'clientSecret',
  dataIndex: 'clientSecret',
}, {
  title: 'redirectUri',
  key: 'redirectUri',
  dataIndex: 'redirectUri',
}]

const Index = Container((props, onData) => {
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
  <Card title='clients'>
    <Table dataSource={clients} columns={columns} />
  </Card>
</div>)

FlowRouter.route('/clients', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'clients',
})
