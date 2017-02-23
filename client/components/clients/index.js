import { Card, Table, Button } from 'antd'

const columns = [{
  title: '_id',
  key: '_id',
  dataIndex: '_id',
  width: 192,
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
  <Card title='Clients' extra={<a href='/clients/new'>New</a>}>
    <Table dataSource={clients} columns={columns} />
  </Card>
</div>)
