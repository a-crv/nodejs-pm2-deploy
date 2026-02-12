const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '.env.deploy'),
});

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_REP, DEPLOY_PATH,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REP,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -Cr .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared`,
      'pre-deploy': `cp ${DEPLOY_PATH}/shared/.env ${DEPLOY_PATH}/current/backend/.env`,
      'post-deploy': 'cd backend && pwd && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
