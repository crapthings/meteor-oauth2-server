const Nav = ({ user }) => <div>
  <ul>
    <li>
      <a href='/'>home</a>
    </li>

    {user._isOAuthAdmin && <li>
      <a href='/clients'>clients</a>
    </li>}

    <li>
      <a href='/users'>users</a>
    </li>

    {user._isOAuthAdmin && <li>
      <a href='/administrators'>administrators</a>
    </li>}

    <li>
      <a href='/' onClick={() => Meteor.logout()}>logout</a>
    </li>
  </ul>
</div>

Layout = Container((props, onData) => {
  const userId = Meteor.userId()
  const user = Meteor.user() || {}
  onData(null, { userId, user })
})(({ Index, userId, user }) => (userId === user._id) ? <div>
  <Nav user={user} />
  <Index />
</div> : <Login />
)
