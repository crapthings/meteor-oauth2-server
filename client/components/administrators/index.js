const Index = Container((props, onData) => {
  const loaded = Meteor.subscribe('administrators').ready()
  if (loaded) {
    const users = Users.find({ _isOAuthAdmin: true }, {
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
      </tr>
    </thead>
    <tbody>
      {users.map(user => <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.emails[0].address}</td>
      </tr>)}
    </tbody>
  </table>
</div>)

FlowRouter.route('/administrators', {
  action() {
    Mount(DefaultLayout, { Index })
  },

  name: 'administrators',
})
