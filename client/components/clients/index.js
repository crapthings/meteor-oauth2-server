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
      </tr>
    </thead>
    <tbody>
      {clients.map(client => <tr key={client._id}>
        <td>1</td>
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
