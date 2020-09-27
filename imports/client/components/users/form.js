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

export default ({ data = {} }) => {
  const email = _.get(data, 'emails.0.address')
  return (
    <Form initialValues={{ email, ...data }} onFinish={submit}>
      <Item {...itemLayout} label='用户名' name='username' extra='账号登陆用户名'>
        <Input placeholder='example' disabled={email ? true : false} required />
      </Item>

      <Item {...itemLayout} label='邮箱' name='email' extra='账号登录邮箱'>
        <Input placeholder='example@domain.com' disabled={email ? true : false} required />
      </Item>

      <Item {...itemLayout} label='密码' name='password' extra='账号登录密码'>
        <Input.Password required />
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
    Meteor.call('users.new', data, err => {
      if (err) return message.error(err.reason)
      message.success('用户账号创建成功')
      FlowRouter.go('users')
    })
  } else {
    Meteor.call('users.edit', user._id, data, err => {
      if (err) return message.error(err.reason)
      message.success('用户账号编辑成功')
    })
  }
}
