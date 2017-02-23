import Index from './index'
import New from './new'
import Edit from './edit'

FlowRouter.route('/users', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'users',
})


FlowRouter.route('/users/new', {
  action() {
    Mount(DefaultLayout, { Index: New })
  },

  name: 'newUser',
})

FlowRouter.route('/users/edit/:_id', {
  action() {
    Mount(DefaultLayout, { Index: Edit })
  },

  name: 'editUser',
})
