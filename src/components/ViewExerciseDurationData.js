import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Label } from 'recharts';

export function ViewRecentExerciseData({durationAvg, last20}) {
    const durationColor = '#470352';
    const heartRateColor = '#01471d';
    return (
      <div id="view-last20-data">
        <div id="avg-workout-length">
          Your average workout length is {durationAvg} minutes.
        </div>
        <ResponsiveContainer className="duration-chart" width="90%" height={600}>
          <LineChart margin={{top: 50, bottom: 50, left: 25}} data={last20}>
            <XAxis dataKey="date" reversed padding={{left: 15, right: 15}} axisLine={{stroke: 'black'}} tickLine={{stroke: 'black'}} tick={<CustomXAxisTick />}>
              <Label value="Your Last 20 Workouts" offset={500} position="top" fill="black" />
              <Label value="Date" offset={20} position="bottom" fill="black" />
            </XAxis>
            <YAxis yAxisId="left" dataKey="duration" axisLine={{stroke: durationColor}} tickLine={{stroke: durationColor}} tick={{fill: 'black'}}>
              <Label value="Workout Length (minutes)" angle={-90} offset={0} position="left" fill="black" />
            </YAxis>
            <YAxis yAxisId="right" orientation="right" axisLine={{stroke: heartRateColor}} tickLine={{stroke: heartRateColor}} tick={{fill: 'black'}}>
                <Label value="Heart Rate (bpm)" angle={-90} offset={-50} position="left" fill="black" />
            </YAxis>
            <Line yAxisId="left" type="linear" dataKey="duration" stroke={durationColor} />
            <Line yAxisId="right" type="linear" dataKey="heart_rate" connectNulls stroke={heartRateColor} />
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
    return `${months[unformatted[1]]} ${parseInt(unformatted[2], 10)}`
}
  
function CustomXAxisTick({x, y, _, payload}) {
    return(
        <g transform={`translate(${x}, ${y})`}>
        <text x={0} y={0} dy={5} fontSize='12px' textAnchor="end" transform="rotate(-35)">{formatDateText(payload.value)}</text>
        </g>
    );
}

// function CustomDotLabel({x, y, _, value}) {
//     return (
//         <text x={x} y={y} dy={-5} textAnchor="middle">{value}</text>
//     );
// }
  
function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
        <div className="custom-tooltip">
            <p className="tooltip-date-description">{`${formatDateText(label)}: ${payload[0].payload.description}`}</p>
            <p className="tooltip-duration">{`${payload[0].value} minutes`}</p>
            {payload[0].payload.heart_rate
                ? <p className="tooltip-duration">{`${payload[0].payload.heart_rate} bpm`}</p>
                : null
            }
        </div>
        );
    }

    return null;
};
  