import { Store } from 'flummox';


export default class ActivitiesStore extends Store {
  constructor(flux) {
    super();

    this.state = {
      currentActivity: -1,
      activities: [],
      //currentAdvertisement: -1,
      //advertisements: []
    };

    // TODO: Koala now provides one monolithic action for all data. We later
    // want to split up the API to have seperate actions for each store.
    const actionIds = flux.getActionIds('koala');

    this.register(actionIds.getActivities, this.handleNewActivities);
    this.register(actionIds.getAdvertisements, this.handleNewAdvertisements);
    this.register(actionIds.next, this.handleNext);

    //this.register(actionIds.next, this.handleNext);
  }

  handleNewActivities(activities) {
    // the api doesn't seem to return the dates sorted. So we sort
    // them here.
    const sorted =
      activities.map((a) => {
        a.start_date = new Date(a.start_date);
        a.end_date = new Date(a.end_date);
        return {type:'activity', content: a};
      }).sort((a,b) => a.content.start_date - b.content.start_date)
        .map((a,i) => {a.id = i; return a;});

    this.setState({
      currentActivity: 0,
      activities: sorted
    });
  }

  // advertisements are interpolated
  handleNewAdvertisements(advertisements) {
    /*this.setState({
      currentActivity: 0,
      activities: this.state.activities
        + advertisements.map((a,i) => { return {
          type: 'advertisement',
          content: a,
          id: i
        }})
    });*/
  }
  handleNext(data) {
    if(this.state.currentActivity >= this.state.activities.length -1) {
      this.setState({currentActivity:0});
    } else {
      this.setState({currentActivity: this.state.currentActivity + 1});
    }
  }


  currentPoster() {
  }
}
