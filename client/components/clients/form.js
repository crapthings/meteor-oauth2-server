import { Form, Input, Button, Icon, message } from 'antd'

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

export default ({ client = {} }) => <Form id='client-form' style={{ width: 768 }} onSubmit={(e) => submit({ e, client })}>
  <Item {...itemLayout} label='应用名称' extra='用以识别应用的名称' required>
    <Input
      name='clientName'
      defaultValue={client.clientName}
      placeholder='我的应用'
      required
    />
  </Item>

  <Item {...itemLayout} label='客户端 ID' extra='任意字符，建议随机字符串' required>
    <Input
      id='clientId'
      name='clientId'
      defaultValue={client.clientId}
      placeholder={Random.id()}
      addonAfter={
        <Icon type='reload' onClick={() => $('#clientId').val(Random.id())}></Icon>
      }
      required
    />
  </Item>

  <Item {...itemLayout} label='客户端密匙' extra='任意字符，建议随机字符串' required>
    <Input
      id='clientSecret'
      name='clientSecret'
      defaultValue={client.clientSecret}
      placeholder={Random.id()}
      addonAfter={
        <Icon type='reload' onClick={() => $('#clientSecret').val(Random.id())}></Icon>
      }
      required
      />
  </Item>

  <Item {...itemLayout} label='跳转链接' extra='for meteor app: /_oauth/MeteorOAuth2Server' required>
    <Input
      name='redirectUri'
      defaultValue={client.redirectUri}
      placeholder='http://example.com/_oauth/MeteorOAuth2Server'
      required
    />
  </Item>

  <Item {...tailItemLayout}>
    <Button type='primary' htmlType='submit'>提交</Button>
  </Item>
</Form>

function submit({ e, client }) {
  e.preventDefault()
  const data = Form2js('client-form')
  if (!client._id) {
    Meteor.call('clients.new', data, err => {
      if (err) return console.log(err)
      FlowRouter.go('clients')
      message.success('创建客户端成功')
    })
  } else {
    Meteor.call('clients.edit', client._id, data, err => {
      if (err) return console.log(err)
      message.success('更改客户端成功')
    })
  }
}
