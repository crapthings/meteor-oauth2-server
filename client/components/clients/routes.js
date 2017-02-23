import Index from './index'
import New from './new'

FlowRouter.route('/clients', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'clients',
})

FlowRouter.route('/clients/new', {
  action() {
    Mount(DefaultLayout, { Index: New })
  },

  name: 'newClient',
})
