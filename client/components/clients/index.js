const Index = Container((props, onData) => {
  onData(null, {})
})(() => <div>
  clients
</div>)

FlowRouter.route('/clients', {
  action() {
    Mount(Layout, { Index })
  },

  name: 'clients',
})
