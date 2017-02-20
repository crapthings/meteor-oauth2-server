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
  Meteor.loginWithPassword(email, password, err => !err && FlowRouter.go('home'))
}
