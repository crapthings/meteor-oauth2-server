import { Card } from 'antd'

import Form from './form'

const tracker = (props, onData) => {
  const _id = FlowRouter.getParam('_id')
  const loaded = Meteor.subscribe('user', _id).ready()
  if (loaded) {
    const user = Users.findOne(_id)
    onData(null, { user })
  }
}

const index = ({ user }) => <div className='ui-padded'>
  <Card title='编辑用户账号' extra={<a href='/users'>返回</a>}>
    <Form user={user} />
  </Card>
</div>

export default Container(tracker)(index)
