import { Actions } from 'flummox';


import http from 'axios';

export default class KoalaActions extends Actions {
  constructor(activitiesEndpoint, advertisementsEndpoint) {
    super();
    this.activitiesEndpoint = activitiesEndpoint;
    this.advertisementsEndpoint = advertisementsEndpoint;
  }

  async getData() {
    try {
      const activities = (await http.get(this.activitiesEndpoint)).data;
      const advertisements = (await http.get(this.advertisementsEndpoint)).data;

      this.data = activities.concat(advertisements);

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
