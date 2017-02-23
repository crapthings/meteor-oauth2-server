import Index from './index'
import New from './new'
import Edit from './edit'

FlowRouter.route('/administrators', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'administrators',
})

FlowRouter.route('/administrators/new', {
  action() {
    Mount(DefaultLayout, { Index: New })
  },

  name: 'newAdministrator',
})

FlowRouter.route('/administrators/edit/:_id', {
  action() {
    Mount(DefaultLayout, { Index: Edit })
  },

  name: 'editAdministrator',
})
