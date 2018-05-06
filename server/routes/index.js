module.exports = (router) => {
  router.use('/', require('./main'))
  router.use('/session', require('./session'))
}
