import { Menu } from 'antd'

const { Item } = Menu

export default ({ user }) => <Menu>
  <Item>
    <a href='/'>home</a>
  </Item>

  {user._isOAuthAdmin && <Item>
    <a href='/clients'>clients</a>
  </Item>}

  <Item>
    <a href='/users'>users</a>
  </Item>

  {user._isOAuthAdmin && <Item>
    <a href='/administrators'>administrators</a>
  </Item>}

  <Item>
    <a href='/' onClick={() => Meteor.logout()}>logout</a>
  </Item>
</Menu>
