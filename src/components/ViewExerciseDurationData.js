import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Label } from 'recharts';

export function ViewExerciseDurationData({durationData}) {
    return (
      <div id="view-duration-data">
        <div id="avg-workout-length">
          Your average workout length is {durationData.average} minutes.
        </div>
        <ResponsiveContainer className="duration-chart" width="50%" height={250}>
          <LineChart margin={{top: 50, bottom: 50, left: 25}} data={durationData.listRecent}>
            <XAxis dataKey="date" padding={{left: 15, right: 15}} tick={<CustomXAxisTick />}>
              <Label value="Lengths of Your Last 20 Workouts" offset={130} position="top" fill="black" />
              <Label value="Date" offset={20} position="bottom" fill="black" />
            </XAxis>
            <YAxis dataKey="duration" padding={{top: 20}} tick={{fill: 'black'}}>
              <Label value="Minutes" angle={-90} offset={0} position="left" fill="black" />
            </YAxis>
            <Line type="linear" dataKey="duration" label={<CustomDotLabel />} />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}
  
function formatDateText(info) {
    const months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'Aug',
      '09': 'Sept',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    }
    const unformatted = info.split('-');
    return `${months[unformatted[1]]} ${unformatted[2]}`
}
  
function CustomXAxisTick({x, y, _, payload}) {
    return(
        <g transform={`translate(${x}, ${y})`}>
        <text x={0} y={0} dy={5} fontSize='12px' textAnchor="end" transform="rotate(-35)">{formatDateText(payload.value)}</text>
        </g>
    );
}

    function CustomDotLabel({x, y, _, value}) {
        return (
            <text x={x} y={y} dy={-5} textAnchor="middle">{value}</text>
        );
}
  
function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
        <div className="custom-tooltip">
            <p className="label">{formatDateText(label)}</p>
            <p className="rate">{`${payload[0].value} minutes`}</p>
        </div>
        );
    }

    return null;
};
  