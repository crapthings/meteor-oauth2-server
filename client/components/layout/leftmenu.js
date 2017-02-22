import { Menu } from 'antd'

export default ({ user }) => <div>
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
