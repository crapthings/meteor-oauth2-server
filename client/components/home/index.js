import { Card } from 'antd'

const Index = Container((props, onData) => {
  onData(null, {})
})(() => <div className='ui-padded'>
  <Card title='home'>
    <span>home</span>
  </Card>
</div>)

FlowRouter.route('/', {
  action(params, queryParams) {
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
    Mount(DefaultLayout, { Index })
  },

  name: 'home',
})
