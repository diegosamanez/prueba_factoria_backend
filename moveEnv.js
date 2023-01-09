// move .env to build folder
const fs = require('fs')
const path = require('path')
const envPath = path.resolve(__dirname, './.env.example')
const envBuildPath = path.resolve(__dirname, './build/.env')
fs.copyFileSync(envPath, envBuildPath)
