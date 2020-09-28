import { Card } from 'antd'

import Form from './form'

export default () => {
  const _id = FlowRouter.getParam('_id')
  const ready = useTracker(() => Meteor.subscribe('client', _id).ready(), [])
  const client = useTracker(() => Clients.findOne(_id), [])

  if (!ready) {
    return (
      <div>读取中</div>
    )
  }

  return (
    <div className='ui-padded'>
      <Card title='编辑客户端' extra={<a href='/clients'>返回</a>}>
        <Form data={client} />
      </Card>
    </div>
  )
}
