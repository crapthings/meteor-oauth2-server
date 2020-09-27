Accounts.onCreateUser(({ email, password, ...options }, user) => ({ ...options, ...user }))
