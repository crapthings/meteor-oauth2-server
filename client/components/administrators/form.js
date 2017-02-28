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

export default ({ user = {} }) => {
  const email = _.get(user, 'emails[0].address')
  return <Form id='user-form' style={{ width: 768 }} onSubmit={(e) => submit({ e, user })}>
    <Item {...itemLayout} label='邮箱' extra='账号登录邮箱' required>
      <Input
        name='email'
        defaultValue={email}
        placeholder='example@domain.com'
        disabled={email ? true : false}
        required
      />
    </Item>

    <Item {...itemLayout} label='密码' extra='账号密码' required>
      <Input
        type='password'
        name='password'
        required
      />
    </Item>

    <Item {...tailItemLayout}>
      <Button type='primary' htmlType='submit'>提交</Button>
    </Item>
  </Form>
}

function submit({ e, user }) {
  e.preventDefault()
  const data = Form2js('user-form')
  if (!user._id) {
    Meteor.call('administrators.new', data, err => {
      if (err) return console.log(err)
      FlowRouter.go('users')
      message.success('创建客户端成功')
    })
  } else {
    Meteor.call('administrators.edit', user._id, data, err => {
      if (err) return console.log(err)
      message.success('更改客户端成功')
    })
  }
}
