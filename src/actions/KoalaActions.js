import { Actions } from 'flummox';


import http from 'axios';

export default class KoalaActions extends Actions {
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }

  // TODO: In the future make this two seperate endpoints
  async getData() {
    try {
      this.data = (await http.get(this.endpoint)).data;

      // FIXME: This is a hax
      this.getActivities();
    } catch (e) {
      console.error(e);
    }
  }

  // for now should never be called directly
  getActivities() {
    return this.data;
  }

  next () {
    return 3;
  }
}
