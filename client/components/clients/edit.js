import { Card } from 'antd'

import Form from './form'

const tracker = (props, onData) => {
  const _id = FlowRouter.getParam('_id')
  const loaded = Meteor.subscribe('client', _id).ready()
  if (loaded) {
    const client = Clients.findOne(_id)
    onData(null, { client })
  }
}

const index = ({ client }) => <div className='ui-padded'>
  <Card title='编辑客户端' extra={<a href='/clients'>返回</a>}>
    <Form client={client} />
  </Card>
</div>

export default Container(tracker)(index)
