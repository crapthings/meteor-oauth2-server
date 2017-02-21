Login = () => <div>
  <form id='login-form' onSubmit={submit}>
    <div>
      <label>
        <span>email</span>
        <input type='text' name='email' />
      </label>
    </div>

    <div>
      <label>
        <span>password</span>
        <input type='password' name='password' />
      </label>
    </div>

    <div>
      <input type='submit' value='登录' />
    </div>
  </form>
</div>

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
