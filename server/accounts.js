Accounts.onCreateUser((user, options) => _.extend(_.omit(user, ['password']), options))

Meteor.startup(() => {

  const adminUser = Accounts.findUserByEmail('admin@admin.com')

  if (!adminUser) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin',
      _isOAuthAdmin: true,
    })
  }

})
