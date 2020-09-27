Meteor.startup(() => {
  const adminUser = Accounts.findUserByEmail('admin@admin.com')
  const demoUser = Accounts.findUserByEmail('demo@demo.com')

  if (!adminUser) {
    Accounts.createUser({
      email: 'admin@admin.com',
      password: 'admin',
      _isOAuthAdmin: true,
    })
  }

  if (!demoUser) {
    Accounts.createUser({
      email: 'demo@demo.com',
      password: 'demo',
    })
  }

  if (!Clients.findOne()) {
    Clients.insert({
      clientName: 'My Client Name',
      clientId: 'clientApplication',
      clientSecret: '12345',
      redirectUri: 'http://localhost:3200/_oauth/MeteorOAuth2Server',
      active: true,
    })
  }
})
