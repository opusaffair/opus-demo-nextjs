import Layout from "../components/Layout";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useFetchUser } from "../utils/user";

let firstDate = new Date();
let lastDate = new Date();
lastDate.setDate(lastDate.getDate() + 7);

const ExploreView = props => {
  const QUERY_TOP_5_EVENTS = gql`
    query top5popularEventsThisWeek($today: String, $inAWeek: String) {
      Event(
        first: 5
        filter: {
          Instance: {
            location_distance_lte: {
              point: { latitude: 42.3601, longitude: -71.058 }
              distance: 10000
            }
            endDateTime_gte: { formatted: $today }
            startDateTime_lte: { formatted: $inAWeek }
          }
        }
        orderBy: popularity_desc
      ) {
        _id
        title
        displayInstanceDaterange(showTime: false, withYear: false)
        organizerNames
      }
    }
  `;

  let variables = {
    today: firstDate,
    inAWeek: lastDate
  };
  const { user, userLoading } = useFetchUser();
  const { data, loading, error } = useQuery(QUERY_TOP_5_EVENTS, { variables });
  if (error) console.log(error);
  // if (data) console.log(data);
  return (
    <Layout user={user} userLoading={userLoading}>
      <div>
        {`Explore View`}
        {loading && <>Loading Events...</>}
        <ul>
          {data &&
            data.Event &&
            data.Event.map(e => <li key={e._id}>{e.title}</li>)}
        </ul>
      </div>
    </Layout>
  );
};

export default ExploreView;
