import { Actions } from 'flummox';


import http from 'axios';

export default class KoalaActions extends Actions {
  constructor(activitiesEndpoint, advertisementsEndpoint) {
    super();
    this.activitiesEndpoint = activitiesEndpoint;
    this.advertisementsEndpoint = advertisementsEndpoint;
  }

  // TODO: In the future make this two seperate activitiesEndpoints
  async getData() {
    try {
      this.data = (await http.get(this.activitiesEndpoint)).data;

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
