const router = require('express').Router()
const uploader = require('../helpers/multer-config')

// import contollers
const { upload } = require('../controllers')

// define router
router.post('/upload', uploader.single('image'), upload.add)

// export * router
module.exports = router