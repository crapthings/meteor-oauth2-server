import { Layout, Card, Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Item } = Form

const formLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const submitLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export default () => {
  const onFinish = ({ username, password }) => {
    login({ username, password })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Layout>
      <Content>
        <div style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{ width: 64 * 10 }}>
            <Card title='登录'>
              <Form
                {...formLayout}
                name='basic'
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label='用户名'
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label='密码'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item {...submitLayout}>
                  <Button type='primary' htmlType='submit'>登录</Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

function login({ username, password }) {
  Meteor.loginWithPassword(username, password, err => {
    if (err) return console.log(err)

    const { queryParams } = FlowRouter.current()

    const {
      client_id,
      redirect_uri,
      response_type,
      scope,
      state,
    } = queryParams

    if (client_id, redirect_uri, response_type, scope, state) {
      oAuth2Server.callMethod.authCodeGrant(
        client_id,
        redirect_uri,
        response_type,
        scope && scope.split(' '),
        state,
        function(err, result) {
          console.log(err, result)
          if (result.success) {
            window.location = result.redirectToUri
          }
        }
      )
    }
  })
}
