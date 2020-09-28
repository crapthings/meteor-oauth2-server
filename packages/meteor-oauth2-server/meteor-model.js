MeteorModel = (function () {
  function MeteorModel (accessTokenCollection, refreshTokenCollection, clientCollection, authCodeCollection, debug) {
    const dlog = (msg) => debug === true && console.log('[OAuth2Server]', msg)

    this.accessTokenCollection = accessTokenCollection
    this.refreshTokenCollection = refreshTokenCollection
    this.clientCollection = clientCollection
    this.authCodeCollection = authCodeCollection
    this.debug = debug

    this.getAccessToken = Meteor.bindEnvironment(function (bearerToken, callback) {
      dlog(`in getAccessToken (bearerToken: ${bearerToken})`)

      try {
        const token = this.accessTokenCollection.findOne({ accessToken: bearerToken })
        callback(null, token)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.getClient = Meteor.bindEnvironment(function (clientId, clientSecret, callback) {
      dlog(`'in getClient (clientId: ${clientId}, clientSecret: ${clientSecret})`)

      try {
        let client
        if (clientSecret === null) {
          client = this.clientCollection.findOne({ active: true, clientId: clientId })
        } else {
          client = this.clientCollection.findOne({ active: true, clientId: clientId, clientSecret: clientSecret })
        }
        callback(null, client)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.grantTypeAllowed = Meteor.bindEnvironment(function (clientId, grantType, callback) {
      dlog(`in grantTypeAllowed (clientId: ${clientId}, grantType: ${grantType})`)

      callback(false, grantType === 'authorization_code')
    }, null, this)

    this.saveAccessToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {
      dlog(`in saveAccessToken (token: ${token}, clientId: ${clientId}, user: ${user}, expires: ${expires})`)

      try {
        const tokenId = this.accessTokenCollection.insert({ accessToken: token, clientId: clientId, userId: user.id, expires: expires })
        callback(null, tokenId)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.getAuthCode = Meteor.bindEnvironment(function (authCode, callback) {
      dlog(`in getAuthCode (authCode: ${authCode})`)

      try {
        const code = this.authCodeCollection.findOne({ authCode: authCode })
        callback(null, code)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.saveAuthCode = Meteor.bindEnvironment(function (code, clientId, expires, user, callback) {
      dlog(`in saveAuthCode (code: ${code}, clientId: ${clientId}, expires: ${expires}, user: ${user})`)

      try {
        this.authCodeCollection.remove({ authCode: code })
        const codeId = this.authCodeCollection.insert({ authCode: code, clientId: clientId, userId: user.id, expires: expires })
        callback(null, codeId)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.saveRefreshToken = Meteor.bindEnvironment(function (token, clientId, expires, user, callback) {
      dlog(`in saveRefreshToken (token: ${token}, clientId: ${clientId}, user: ${user}, expires: ${expires})`)

      try {
        this.refreshTokenCollection.remove({ refreshToken: token })
        const tokenId = this.refreshTokenCollection.insert({ refreshToken: token, clientId: clientId, userId: user.id, })
        callback(null, tokenId)
      } catch (e) {
        callback(e)
      }
    }, null, this)

    this.getRefreshToken = Meteor.bindEnvironment(function (refreshToken, callback) {
      dlog(`in getRefreshToken (refreshToken: ${refreshToken})`)

      try {
        const token = this.refreshTokenCollection.findOne({ refreshToken: refreshToken })
        callback(null, token)
      } catch (e) {
        callback(e)
      }
    }, null, this)
  }

  return MeteorModel
})()
