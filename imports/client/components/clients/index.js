import DefaultLayout from '../layout'
import List from './list'
import New from './new'
import Edit from './edit'

FlowRouter.route('/clients', {
  action() {
    Mount(DefaultLayout, { Index: List })
  },

  name: 'clients',
})

FlowRouter.route('/clients/new', {
  action() {
    Mount(DefaultLayout, { Index: New })
  },

  name: 'newClient',
})

FlowRouter.route('/clients/edit/:_id', {
  action() {
    Mount(DefaultLayout, { Index: Edit })
  },

  name: 'editClient',
})
