module.exports = {
  apps: [
    {
      name: 'NuxtCloudSeeker',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
