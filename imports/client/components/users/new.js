import { Card } from 'antd'

import Form from './form'

export default () => <div className='ui-padded'>
  <Card title='创建用户账号' extra={<a href='/users'>返回</a>}>
    <Form />
  </Card>
</div>
