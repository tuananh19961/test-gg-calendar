import axios from "axios";

import { MSconfig } from '../../config';

import Event from "./event";
import Auth from "./auth";

export default class MSapi {
  // Private
  #baseURL;
  #client;

  // Public
  auth = null;
  scopes = ["user.read", "mail.send", "Calendars.Read", "Calendars.Read.Shared", "Calendars.ReadWrite"];

  /**
   * MSapi constructor
   */
  constructor() {
    this.#baseURL = 'https://graph.microsoft.com/v1.0';
    this.#client = axios.create({
      baseURL: this.#baseURL,
      timeout: 15000,
      headers: {
        "Accept": "application/json"
      }
    });

    /** Authencticate instance */
    if (!MSconfig?.auth?.clientId) {
      throw new Error('[ERROR][MS-TEAM]: Please provide a Azure CliendID!');
    }
    this.auth = new Auth(MSconfig);
  }

  /**
   * Excute query
   * @param {*} url 
   * @param {*} method 
   * @param {*} query 
   * @returns 
   */
  excute = async (url, method, { params = {}, data = {} } = {}) => {
    const accessToken = this.auth.getToken();
    const query = Object.keys(params).reduce((a, b) => ({ ...a, [`$${b}`]: params[b] }), {})

    return this.#client({
      url,
      method,
      data,
      params: query,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    }).then(res => Promise.resolve(res.data))
      .catch(error => Promise.reject(error))
  }

  /**
   * Excute GraphQL
   * @param {*} url endpoint of resource
   * @param {*} method method
   * @param {*} body https://learn.microsoft.com/en-us/graph/query-parameters?tabs=http
   * @returns Promise
   */
  fetch = async (url, method, body = {}) => new Promise((resolve, reject) => {
    if (!url) {
      reject('[ERROR][MS-TEAM]: Please provide a valid URL.');
    }

    const self = this;

    // Excute query
    self.excute(url, method, body)
      .then(res => resolve(res))
      .catch(async (error) => {
        // Unauthenticate Error
        if (error?.response?.status === 401) {
          // Request new token
          await this.auth.requestToken({ scopes: self.scopes });
          // retry excute
          self.excute(url, method, body).then(res => resolve(res)).catch(err => reject(err));

          return
        }

        reject(error);
      });
  })

  /**
   * Api for event
   * @returns Event
   */
  events = () => {
    return new Event(this)
  }
}