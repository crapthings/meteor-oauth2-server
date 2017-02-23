Accounts.onCreateUser((user, options) => {
  return _.extend(_.omit(user, ['email', 'password']), options)
})
