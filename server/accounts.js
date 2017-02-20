Accounts.onCreateUser((user, options) => _.extend(user, _.omit(options, ['password'])))

Meteor.startup(() => {

  const adminUser = Accounts.findUserByEmail('admin@admin.com')

  if (!adminUser) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin',
      _isAdmin: true,
    })
  }

})
