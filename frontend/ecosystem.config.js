const path = require('path');
const dotenv = require("dotenv");
dotenv.config({ path: "./.env.deploy" });

dotenv.config({
  path: path.resolve(__dirname, '.env.deploy'),
});

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_REP, DEPLOY_PATH, DEPLOY_REF } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REP,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp -Cr .env.production ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared`,
      'pre-deploy': `cp ${DEPLOY_PATH}/shared/.env.production ${DEPLOY_PATH}/current/frontend/.env.production`,
      'post-deploy': 'cd frontend && pwd && npm ci && npm run build',
    },
  },
};