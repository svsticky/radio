import React, {Component, PropTypes} from 'react';
import fetch from 'isomorphic-fetch';
import Poster from '../components/Poster';
import Activities from '../components/Activities';
import Clock from '../components/Clock';
// import Quotes from '../components/Quotes';
import Tile from '../components/Tile';

/**
 * Utility function to change dates from activities to actual Date objects
 */
function setDate(activity) {
    return Object.assign(
        {},
        activity,
        {has_start_time: activity.start_date.indexOf('T') > -1},
        {has_end_time: activity.end_date && activity.end_date.indexOf('T') > -1},
        {start_date: new Date(activity.start_date)},
        activity.end_date ? {end_date: new Date(activity.end_date)} : null
    );
}

/**
 * Main app entrypoint.
 */
export default class App extends Component {

    static propTypes = {
        /**
         * The interval in milliseconds that indicates how often to reload the
         * activities and advertisements from koala
         */
        loadInterval: PropTypes.number,
        /**
         * The interval in milliseconds that indicates how often we switch to
         * a next activity or advertisement
         */
        nextInterval: PropTypes.number,
        /**
         * The api root of the koala Api. an example is http://koala.svsticky.nl/api
         * for the Sticky Utrecht Koala instance
         */
        apiRoot: PropTypes.string.isRequired
    };

    /**
     * Default values for properties
     */
    static defaultProps = {
        loadInterval: 15 * 60 * 1000,
        nextInterval: 1 * 1000
    };

    constructor(props) {
        super(props);

        this.activitiesEndpoint = `${this.props.apiRoot}/activities`;
        this.adsEndpoint = `${this.props.apiRoot}/advertisements`;
        this.quotesEndpoint = 'https://spreadsheets.google.com/feeds/cells/1-M58vht6mt-6prf_ZWKe7i-P1ZoIBPyC1vLiAMOYg/2/public/full?alt=json';
        // this.quotesEndpoint = 'https://spreadsheets.google.com/feeds/cells/1-M58vht6mt-6pAYrf_ZWKe7i-P1ZoIBPyC1vLiAMOYg/2/public/full?alt=json';

        this.state = {
            currentActivity: null,
            currentAd: null,
            activities: [],
            ads: [],
            quotes: [['Hier je quote?', 'Quotes@svsticky.nl']],
            currentQuote: null,
            quoteParser: null,
            quoteJson: null
        };
    }

    loadData() {
        // See https://davidwalsh.name/fetch

        // get activities
        fetch(this.activitiesEndpoint)
        // fix activity dates and sort them on start_date
            .then(resp => resp.json())
            .then(activities => activities.map(setDate).sort((a, b) => a.start_date - b.start_date))
            .then(activities =>
                fetch(this.adsEndpoint)
                    .then(resp => resp.json())
                    .then(ads => {
                        // make sure that we don't start scrolling activities or ads when
                        // there are no activities or ads to scroll through.
                        const currentActivity = activities.length > 0 ? 0 : null;
                        const currentAd = currentActivity === null && ads.length > 0 ? 0 : null;
                        this.setState({
                            activities: activities.filter(act => act.poster),
                            ads,
                            currentActivity,
                            currentAd
                        });
                    }));
        //get quotes
        try {
            fetch(this.quotesEndpoint)
                .then(resp => resp.json()).then(asJson => this.setState({
                quoteJson: asJson.feed.entry
            })).then(nothing => this.parseQuotes());
        } catch (e) {

        }
    }


    parseToQuotes(rawData) {
        this.state.uniques = rawData[0].content.$t;
        let quotes = [['Hier je quote?', 'Quotes@svsticky.nl']];
        for (var i = 1; i < 2 * this.state.uniques; i += 2) {
            let quoter = rawData[i].content.$t;
            let quote = rawData[i + 1].content.$t;
            let quoteSet = [quote, quoter];
            quotes.push(quoteSet);
        }
        this.setState({
            quotes: quotes
        })
        return quotes;
    }


    parseQuotes() {
        let parsed = this.parseToQuotes(this.state.quoteJson);
        this.setState({quotes: parsed});
    }


    currentPoster() {
        if (this.state.currentActivity !== null) {
            return this.state.activities[this.state.currentActivity].poster;
        } else if (this.state.currentAd !== null) {
            return this.state.ads[this.state.currentAd].poster;
        } else if (this.state.currentQuote !== null) {
            return null;
        }

        // Feature request: Do NOT display this activity


        else {
            return
            'placeholder'; // TODO funny placeholder easterergg
        }
    }

    next() {

        // Case 1:  Both currentActivity and currentAd are null (i.e. there is no data)

        if (this.state.currentActivity === null && this.state.currentAd === null && this.state.currentQuote === null) {
            throw 'Why is there no data?!';
            return;
        }

        // Case 2: Should never happen
        //  > Then why is there a case for it?
        if (this.state.currentActivity !== null && this.state.currentAd !== null) {
            throw 'Invariant violation. Cannot display an ad and activity at the same time!';
        }

        // Case 3: We are displaying activities
        if (this.state.currentActivity !== null) {
            // If we're at the end of the activities
            if (this.state.currentActivity >= this.state.activities.length - 1) {
                // if there are ads, switch to the first ad
                if (this.state.ads.length > 0) {
                    this.setState({
                        currentActivity: null,
                        currentAd: 0
                    });
                    // else go to the quotes
                } else {
                    this.setState({
                        currentQuote: 0
                    });
                }
            } else {
                this.setState({
                    currentActivity: this.state.currentActivity + 1
                });
            }
        }

        // Case 4: We are displaying ads
        else if (this.state.currentAd !== null) {
            // If we're at the end of ads
            if (this.state.currentAd >= this.state.ads.length - 1) {
                // if there are any activities, switch to the quotes
                this.setState({
                    currentAd: null,
                    currentQuote: -1,
                    showedQuote: false
                });
            } else {
                this.setState({
                    currentAd: this.state.currentAd + 1
                });
            }
        }

        //case 5: We are displaying quotes
        else if (this.state.currentQuote !== null) {
            //if there are no activities
            if (this.state.activities.length === 0) {
                //if there are no ads
                if (this.state.ads.length === 0) {
                    this.setState({
                        currentQuote: 1
                    });
                } else {
                    this.setState({
                        currentAd: 0,
                        currentQuote: null
                    });
                }
            }
            //if we do have activities
            else {
                this.setState({
                    currentActivity: 0,
                    currentQuote: null,
                });
            }
        }
    }


    componentDidMount() {
        // set up intervals.
        // every this.props.loadInterval, new events are loaded from koala.
        // every this.props.nextInterval, we switch to the next ad or activity to display
        this.dataLoader =
            setInterval(this.loadData.bind(this), this.props.loadInterval);

        this.loadData();

        this.activityChanger =
            setInterval(this.next.bind(this), this.props.nextInterval);

    }

    componentWillUnmount() {
        clearInterval(this.dataLoader);
        clearInterval(this.activityChanger);
    }

    render() {
        if (this.state.currentQuote === null) {
            return (
                <div className='app'>
                    <div className='cont'>
                        <div className="topbar">
                            <div className='logo'>
                                <img src='https://svsticky.nl/wp-content/uploads/logo-sticky-licht.png'/>
                            </div>
                            <Clock/>
                        </div>
                        <Activities activities={this.state.activities}
                                    currentActivity={this.state.currentActivity}/>
                    </div>
                    <Poster poster={this.currentPoster()}/>
                </div>
            );
        }
        let quoteNumber = Math.floor(Math.random() * this.state.quotes.length);
        return (
            <Tile quote={this.state.quotes[quoteNumber]}/>
        );
    }
}

