import { Activities } from "@/components/Activities";
import { Ad } from "@/components/Ad";
import Announcements from "@/components/Announcements";
import BoardText from "@/components/BoardText";
import Clock from "@/components/Clock";
import Quotes from "@/components/Quotes";
import { TeamSlide } from "@/components/Team";
import Head from "next/head";
import { useState } from "react";

const SCENCES = {
  quotes: Quotes,
  boardText: BoardText,
  activities: Activities,
  advertisement: Ad,
  team: TeamSlide,
  announcements: Announcements,
};

type Scence = keyof typeof SCENCES;

export default function Home() {
  const [view, setView] = useState<Scence>("team");

  // function setNextView(){
  //   const params = new URLSearchParams(window.location.search);

  //   const display_internal = params.get("internal") == "true";

  //   switch (this.state.current) {
  //     case "activities":
  //       if (this.finishedState) {
  //         this.finishedState = false;
  //         this.setState({
  //           current: "advertisement",
  //           index: 0
  //         });
  //       } else {
  //         this.setState({
  //           index: this.state.index + 1
  //         });
  //       }
  //       break;
  //     case "advertisement":
  //       if (this.finishedState) {
  //         this.finishedState = false;

  //         // skip boardText and quotes on the screen on the outside of the
  //         // Sticky room
  //         let new_state = display_internal ? "boardText" : "activities";
  //         this.setState({
  //           current: new_state,
  //           index: 0
  //         });
  //       } else {
  //         this.setState({
  //           index: this.state.index + 1
  //         });
  //       }
  //       break;
  //     case "boardText":
  //       this.setState({
  //         current: "quotes"
  //       });
  //       break;
  //     case "quotes":
  //       this.setState({
  //         current: "activities"
  //       });
  //       break;
  //     default:
  //       return;
  //   }
  // }

  function next() {
    setView("advertisement");
  }

  const Scence = SCENCES[view];

  return (
    <>
      <Head>
        <title> Radio SV sticky</title>
      </Head>
      <div className="app">
        <nav className="topbar">
          <div className="logo">
            <img src={process.env.NEXT_PUBLIC_LOGO} />
          </div>
          <Clock />
        </nav>
        <main>
          <Scence onFinish={next} />
        </main>
      </div>
    </>
  );
}

// /**
//  * Main app entrypoint.
//  */
//  export  class App extends Component {

//   static propTypes = {
//     /**
//      * The interval in milliseconds that indicates how often to reload the
//      * activities and advertisements from koala
//      */
//     loadInterval: PropTypes.number,
//     /**
//      * The interval in milliseconds that indicates how often we switch to
//      * a next activity or advertisement
//      */
//     nextInterval: PropTypes.number,
//     /**
//      * The api root of the koala Api. an example is http://koala.svsticky.nl/api
//      * for the Sticky Utrecht Koala instance
//      */
//     apiRoot: PropTypes.string.isRequired
//   };

//   next() {
//     const params = new URLSearchParams(window.location.search);

//     const display_internal = params.get("internal") == "true";

//     switch (this.state.current) {
//       case "activities":
//         if (this.finishedState) {
//           this.finishedState = false;
//           this.setState({
//             current: "advertisement",
//             index: 0
//           });
//         } else {
//           this.setState({
//             index: this.state.index + 1
//           });
//         }
//         break;
//       case "advertisement":
//         if (this.finishedState) {
//           this.finishedState = false;

//           // skip boardText and quotes on the screen on the outside of the
//           // Sticky room
//           let new_state = display_internal ? "boardText" : "activities";
//           this.setState({
//             current: new_state,
//             index: 0
//           });
//         } else {
//           this.setState({
//             index: this.state.index + 1
//           });
//         }
//         break;
//       case "boardText":
//         this.setState({
//           current: "quotes"
//         });
//         break;
//       case "quotes":
//         this.setState({
//           current: "activities"
//         });
//         break;
//       default:
//         return;
//     }
//   }

//   componentDidMount() {
//     // Set up interval.
//     // Every this.props.nextInterval, we switch to the next ad or activity to display
//     this.activityChanger =
//       setInterval(this.next.bind(this), parseInt(process.env.NEXT_INTERVAL));
//   }

//   componentWillUnmount() {
//     clearInterval(this.dataLoader);
//     clearInterval(this.activityChanger);
//   }

//   renderContent() {
//     switch (this.state.current) {
//       case "activities":
//         return (
//           <Activities
//             current={this.state.index}
//             onChange={() => { this.finishedState = true; }}
//           />
//         );
//       case "advertisement":
//         return (
//           <Ad
//             current={this.state.index}
//             onChange={() => { this.finishedState = true; }}
//           />
//         );
//       case "boardText":
//         return <BoardText />
//       case "quotes":
//         return <Quotes />
//       default:
//         return;
//     }
//   }
