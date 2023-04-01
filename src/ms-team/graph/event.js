// https://learn.microsoft.com/en-us/graph/api/user-list-events?view=graph-rest-1.0&tabs=http
export default class Event {
  client = null;
  constructor(client) {
    this.client = client;
  }

  /**
   * Get events
   * @param {*} url 
   * @param {*} params 
   * @returns 
   */
  get = async (url, params = {}) => {
    return this.client.fetch(url, 'GET', { params });
  }

  /**
   * Create event
   * https://learn.microsoft.com/en-us/graph/api/resources/event?view=graph-rest-1.0#json-representation
   * @param {*} data https://learn.microsoft.com/en-us/graph/api/user-post-events?view=graph-rest-1.0&tabs=http
   * @returns Promise
   */
  create = async (data) => {
    return this.client.fetch('me/events', 'POST', { data });
  }
}