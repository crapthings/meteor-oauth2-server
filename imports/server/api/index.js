JsonRoutes.Middleware.use('/api/*', oAuth2Server.oauthserver.authorise())

JsonRoutes.add('post', '/test', function(req, res, next) {
  const data = Accounts.createUser(req.body)
  JsonRoutes.sendResult(res, { data })
})

JsonRoutes.add('get', '/api/getUserId', function(req, res, next) {
  console.log('GET /api/getUserId')

  const accessTokenStr = req?.params?.access_token || req?.query?.access_token
  const accessToken = oAuth2Server.collections.accessToken.findOne({ accessToken: accessTokenStr })

  JsonRoutes.sendResult(res, {
    data: accessToken.userId
  })
})
