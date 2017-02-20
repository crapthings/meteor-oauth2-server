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
})(({ clients }) => <div>
  <table>
    <thead>
      <tr>
        <td>_id</td>
        <td>client name</td>
        <td>client id</td>
        <td>client secret</td>
        <td>client redirect uri</td>
      </tr>
    </thead>
    <tbody>
      {clients.map(client => <tr key={client._id}>
        <td>{client._id}</td>
        <td>{client.clientName}</td>
        <td>{client.clientId}</td>
        <td>{client.clientSecret}</td>
        <td>{client.redirectUri}</td>
      </tr>)}
    </tbody>
  </table>
</div>)

FlowRouter.route('/clients', {
  action() {
    Mount(Layout, { Index })
  },

  name: 'clients',
})
