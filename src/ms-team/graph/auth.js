import { PublicClientApplication } from '@azure/msal-browser';
import { reactive, ref } from 'vue';

import { Cookie } from '../../utils/cookie';

// https://www.npmjs.com/package/@azure/msal-browser
export default class Auth {
  #app = null;
  token = reactive(Cookie.get('ms-team-access-token'));

  /**
   * Auth constructor
   * @param {*} config 
   */
  constructor(config) {
    this.#app = new PublicClientApplication(config)
  }

  app() {
    return this.#app;
  }

  /**
   * Get token
   * @returns 
   */
  getToken = () => this.token;

  /**
   * Store token to cookie
   * @param {string} accessToken 
   */
  setToken = (accessToken) => {
    this.token = accessToken;
    Cookie.set('ms-team-access-token', accessToken);
  }

  /**
   * Request token
   * @param {*} request 
   */
  requestToken = async (request = {}) => new Promise((resolve, reject) => {
    const self = this;
    const app = self.#app;
    const activeAccount = app.getActiveAccount();

    // Request silent
    app.acquireTokenSilent({ account: activeAccount, ...request })
      .then((res) => {
        const { accessToken } = res;
        self.setToken(accessToken);

        resolve(accessToken);
      }).catch(() => {
        // Request popup if slient error
        app.acquireTokenPopup(request)
          .then((res) => {
            const { accessToken, account } = res;
            app.setActiveAccount(account);
            self.setToken(accessToken);

            resolve(accessToken);
          })
          .catch(error => {
            console.error(`[ERROR][MS-TEAM]-[AUTHENTICATE]: ${error}`);
            reject(error);
          });
      });
  })
}