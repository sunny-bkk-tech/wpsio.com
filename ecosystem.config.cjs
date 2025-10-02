module.exports = {
  apps: [
    {
      name: 'wps-app',
      script: 'logging-server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8080
      },
      log_file: 'logs/wps-app.log',
      out_file: 'logs/wps-app-out.log',
      error_file: 'logs/wps-app-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'wps-automation',
      script: 'scripts/complete-automation.js',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 9 * * *',
      log_file: 'logs/automation.log',
      out_file: 'logs/automation-out.log',
      error_file: 'logs/automation-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'wps-serp-monitor',
      script: 'scripts/complete-automation.js',
      args: '--serp-only',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 14 * * *',
      log_file: 'logs/serp-monitor.log',
      out_file: 'logs/serp-monitor-out.log',
      error_file: 'logs/serp-monitor-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'wps-build-deploy',
      script: 'scripts/pm2-build-deploy.js',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 6 * * *',
      log_file: 'logs/build-deploy.log',
      out_file: 'logs/build-deploy-out.log',
      error_file: 'logs/build-deploy-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'pm2-monitor',
      script: 'scripts/pm2-email-listener.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production'
      },
      log_file: 'logs/pm2-monitor.log',
      out_file: 'logs/pm2-monitor-out.log',
      error_file: 'logs/pm2-monitor-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
