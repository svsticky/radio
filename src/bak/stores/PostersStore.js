import { Store } from 'flummox';

export default class PostersStore extends store {
  constructor(flux) {
    super();

    this.state = {
      currentPoster: 0,
      posters: []
    };

    const actionIds = flux.getActionIds('koala');


    this.register(actionIds.getActivities, this.handleNewActivities);
    this.register(actionIds.getAdvertisements, this.handleNewAdvertisements);
    this.register(actionIds.next, this.handleNext);
  }

  handleNewActivities(activities) {

    // map date strings to Date objects and sort by Date
    const sorted = activities.map((a) => {
      Object.assign({}, a, {
        start_date: new Date(a.start_date),
        end_date: new Date(a.end_date)
      })
    }).sort((a,b) => { a.start_date - b.start_date});

    this.setState({
      currentPoster: 0,
      posters: sorted
    });
  }

  handleNewAdvertisements(advertisements) {
    // simply append advertisements to the end for now
    // you could do stuff like intertween
    this.setState({
      currentPoster: 0,
      posters: this.state.posters.concat(advertisements);
    });
  }
}
