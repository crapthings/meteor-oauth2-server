import { Card } from 'antd'

import Form from './form'

export default () => {
  const _id = FlowRouter.getParam('_id')
  const ready = useTracker(() => Meteor.subscribe('user', _id).ready(), [])
  const user = useTracker(() => Users.findOne(_id), [])

  if (!ready) {
    return (
      <div>读取中</div>
    )
  }

  return (
    <div className='ui-padded'>
      <Card title='编辑用户账号' extra={<a href='/users'>返回</a>}>
        <Form data={user} />
      </Card>
    </div>
  )
}
