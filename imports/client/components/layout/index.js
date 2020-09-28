import { Layout } from 'antd'

import LeftMenu from './leftmenu'
import Login from '../login'

const { Header, Footer, Sider, Content } = Layout

export default ({ Index }) => {
  const userId = useTracker(() => Meteor.userId(), [])
  const user = useTracker(() => Meteor.user(), [])
  const loggingIn = useTracker(() => Meteor.loggingIn(), [])

  if (!userId) {
    return (
      <Login />
    )
  } else if (userId && loggingIn) {
    return (
      <div>读取中</div>
    )
  } else if (user) {
    return (
      <div>
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
      </div>
    )
  } else {
    return null
  }
}
