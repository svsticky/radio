import { Flummox } from 'flummox';
import KoalaActions from './actions/KoalaActions';

import ActivitiesStore from './stores/ActivitiesStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    this.createActions('koala', KoalaActions,
                       'https://koala.stickyutrecht.nl/api/activities');

    this.createStore('activities', ActivitiesStore, this);

  }
}
