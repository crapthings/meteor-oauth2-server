import { Form, Input, Button, Icon, message } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

const { Item } = Form

const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const tailItemLayout = {
  wrapperCol: {
    span: 14,
    offset: 6,
  },
}

export default ({ data = {} }) => {
  return (
    <Form id='client-form' initialValues={data} onFinish={submit}>
      <Item {...itemLayout} label='应用名称' name='clientName' extra='用以识别应用的名称'>
        <Input placeholder='我的应用' required />
      </Item>

      <Item {...itemLayout} label='客户端 ID' name='clientId' extra='任意字符，建议随机字符串'>
        <Input id='clientId' placeholder={Random.id()} addonAfter={<ReloadOutlined onClick={() => $('#clientId').val(Random.id())} />} required />
      </Item>

      <Item {...itemLayout} label='客户端密匙' name='clientSecret' extra='任意字符，建议随机字符串'>
        <Input id='clientSecret' placeholder={Random.id()} addonAfter={<ReloadOutlined onClick={() => $('#clientSecret').val(Random.id())} />} required />
      </Item>

      <Item {...itemLayout} label='跳转链接' name='redirectUri' extra='for meteor app: /_oauth/MeteorOAuth2Server'>
        <Input placeholder='http://example.com/_oauth/MeteorOAuth2Server' required />
      </Item>

      <Item {...tailItemLayout}>
        <Button type='primary' htmlType='submit'>提交</Button>
      </Item>
    </Form>
  )
}

function submit(data) {
  const _id = FlowRouter.getParam('_id')

  if (!_id) {
    Meteor.call('clients.new', data, err => {
      if (err) return message.success(err.reason)
      message.success('客户端创建成功')
      FlowRouter.go('clients')
    })
  } else {
    Meteor.call('clients.edit', _id, data, err => {
      if (err) return message.success(err.reason)
      message.success('客户端编辑成功')
    })
  }
}
