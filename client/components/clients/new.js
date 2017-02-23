import { Card } from 'antd'

import Form from './form'

export default () => <div className='ui-padded'>
  <Card title='创建客户端' extra={<a href='/clients'>返回</a>}>
    <Form />
  </Card>
</div>
