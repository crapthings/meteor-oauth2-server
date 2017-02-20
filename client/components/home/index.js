const Index = Container((props, onData) => {
  onData(null, {})
})(() => <div>
  <span>home</span>
</div>)

FlowRouter.route('/', {
  action() {
    Mount(Layout, { Index })
  },

  name: 'home',
})
