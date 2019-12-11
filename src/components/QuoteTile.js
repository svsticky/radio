
export default class Activity extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.ensureVisible();
    }

    componentDidUpdate() {
        this.ensureVisible();
    }

    ensureVisible() {
        if (this.props.active) {
            scrollIntoView(findDOMNode(this), {
                time: 500
            });
        }
    }
}