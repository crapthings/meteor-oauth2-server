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
  const email = _.get(data, 'emails[0].address')
  return (
    <Form initialValues={{ email, ...data }} onFinish={submit}>
      <Item {...itemLayout} label='用户名' name='username' extra='管理员登录用户名'>
        <Input placeholder='username' disabled={email ? true : false} required />
      </Item>

      <Item {...itemLayout} label='邮箱' name='email' extra='管理员登录邮箱'>
        <Input placeholder='example@domain.com' disabled={email ? true : false} required />
      </Item>

      <Item {...itemLayout} label='密码' name='password' extra='管理员登录密码'>
        <Input.Password required />
      </Item>

      <Item {...tailItemLayout}>
        <Button type='primary' htmlType='submit'>提交</Button>
      </Item>
    </Form>
  )
}

function submit (data) {
  const _id = FlowRouter.getParam('_id')

  if (!_id) {
    Meteor.call('administrators.new', data, (err) => {
      if (err) return message.error(err.reason)
      message.success('管理员创建成功')
      FlowRouter.go('users')
    })
  } else {
    Meteor.call('administrators.edit', _id, data, (err) => {
      if (err) return message.error(err.reason)
      message.success('管理员编辑成功')
    })
  }
}
