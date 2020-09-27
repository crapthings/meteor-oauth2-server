import { Card } from 'antd'

import DefaultLayout from '../layout'

const Index = () => {
  return (
    <div className='ui-padded'>
      <Card title='首页'>
        <span>首页</span>
      </Card>
    </div>
  )
}

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
