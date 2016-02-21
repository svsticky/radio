import { Flummox } from 'flummox';
import KoalaActions from './actions/KoalaActions';

import ActivitiesStore from './stores/ActivitiesStore';

export default class Flux extends Flummox {
  constructor(domain) {
    super();

    this.createActions('koala', KoalaActions,
                       `https://${domain}/api/activities`,
                       `https://${domain}/api/advertisements`);

    this.createStore('activities', ActivitiesStore, this);

  }
}
