const Index = Container((props, onData) => {
  const users = Users.find().fetch()
  onData(null, { users })
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

FlowRouter.route('/users', {
  action() {
    Mount(Layout, { Index })
  },

  name: 'users',
})
