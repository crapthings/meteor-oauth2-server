const Index = Container((props, onData) => {
  const loaded = Meteor.subscribe('users').ready()
  if (loaded) {
    const users = Users.find({ _isOAuthAdmin: { $exists: false } }, {
      sort: {
        createdAt: -1
      }
    }).fetch()
    onData(null, { users })
  }
})(({ users }) => <div>
  <table>
    <thead>
      <tr>
        <td>_id</td>
        <td>email</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      {users.map(user => <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.emails[0].address}</td>
        <td>
          <button type='button' onClick={() => remove(user._id)}>删除</button>
        </td>
      </tr>)}
    </tbody>
  </table>
</div>)

FlowRouter.route('/users', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'users',
})

function remove(_id) {
  if (confirm('确定要删除吗？'))
    Meteor.call('clients.remove', _id)
}
