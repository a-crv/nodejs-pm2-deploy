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
      'pre-deploy': `scp .env .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
