import { Actions } from 'flummox';


import http from 'axios';

export default class KoalaActions extends Actions {
  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }

  // TODO: In the future make this two seperate endpoints
  async getData() {
    console.log('data');
    try {
      this.data = (await http.get(this.endpoint)).data;

      // FIXME: This is a hax
      this.getActivities();
      this.getAdvertisements();
    } catch (e) {
      console.error(e);
    }
  }

  // for now should never be called directly
  getActivities() {
    return this.data.filter(d => 'start_date' in d);
  }
  getAdvertisements() {
    return this.data.filter(d => !'start_date' in d);
  }

  next () {
    return 3;
  }
}
