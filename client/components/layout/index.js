import { Layout } from 'antd'

import LeftMenu from './leftmenu'

const { Header, Footer, Sider, Content } = Layout

DefaultLayout = Container((props, onData) => {
  const userId = Meteor.userId()
  const user = Meteor.user() || {}
  onData(null, { userId, user })
})(({ Index, userId, user }) => (userId === user._id) ? <div>
  <Layout>
    <Header></Header>
    <Layout>
      <Sider>
        <LeftMenu user={user} />
      </Sider>
      <Content>
        <Index />
      </Content>
    </Layout>
    <Footer></Footer>
  </Layout>
</div> : <Login />
)
