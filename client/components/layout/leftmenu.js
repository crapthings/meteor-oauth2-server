import { Menu } from 'antd'

const { Item } = Menu

export default ({ user }) => <Menu>
  <Item>
    <a href='/'>首页</a>
  </Item>

  {user._isOAuthAdmin && <Item>
    <a href='/clients'>客户端</a>
  </Item>}

  <Item>
    <a href='/users'>用户账号</a>
  </Item>

  {user._isOAuthAdmin && <Item>
    <a href='/administrators'>管理员账号</a>
  </Item>}

  <Item>
    <a href='/' onClick={() => Meteor.logout()}>退出</a>
  </Item>
</Menu>
