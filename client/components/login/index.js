import { Layout, Card, Form, Input, Button, Icon } from 'antd'

const { Content } = Layout
const { Item } = Form

Login = () => <Layout>
  <Content>
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ width: 64 * 6 }}>
        <Card title='登录'>
          <Form id='login-form' className='login-form' onSubmit={submit}>
            <Item>
              <Input name='email' addonBefore={<Icon type='user' />} />
            </Item>

            <Item>
              <Input type='password' name='password' addonBefore={<Icon type='lock' />} />
            </Item>

            <Item>
              <Button type='primary' htmlType='submit' className='ui-fit-width'>登录</Button>
            </Item>
          </Form>
        </Card>
      </div>
    </div>
  </Content>
</Layout>

function submit(e) {
  e.preventDefault()
  const { email, password } = Form2js('login-form')
  Meteor.loginWithPassword(email, password, err => {
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
