import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Label } from 'recharts';
import { durationColor, heartRateColor, pieChartColors } from '../utilities/colors';
import { monthDayYearDate } from '../utilities/monthDayYearDate';

export function ViewRecentExerciseData({last20}) {
  last20.forEach((obj, i) => obj.index = i % pieChartColors.length);
    return (
      <div id="view-last20-data">
        <ResponsiveContainer className="duration-chart" width="90%" height={600}>
          <LineChart margin={{top: 50, bottom: 50, left: 25}} data={last20}>
            <XAxis dataKey="date" reversed padding={{left: 15, right: 15}} axisLine={{stroke: 'black'}} tickLine={{stroke: 'black'}} tick={<CustomXAxisTick />}>
              <Label value="Your Last 20 Workouts" offset={500} position="top" fill="black" />
              <Label value="Date" offset={20} position="bottom" fill="black" />
            </XAxis>
            <YAxis yAxisId="left" dataKey="duration" axisLine={{stroke: durationColor}} tickLine={{stroke: durationColor}} tick={{fill: 'black'}}>
              <Label value="Workout Length (minutes)" angle={-90} offset={0} dy={-95} position="left" fill="black" />
            </YAxis>
            <YAxis yAxisId="right" orientation="right" axisLine={{stroke: heartRateColor}} tickLine={{stroke: heartRateColor}} tick={{fill: 'black'}}>
                <Label value="Heart Rate (bpm)" angle={-90} offset={-50} dy={-70} position="left" fill="black" />
            </YAxis>
            <Line yAxisId="left" type="linear" dataKey="duration" stroke={durationColor} strokeWidth={2} />
            <Line yAxisId="right" type="linear" dataKey="heart_rate" connectNulls stroke={heartRateColor} strokeWidth={2} />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}
  
function monthDayDate(info) {
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
        <text x={0} y={0} dy={5} fontSize='12px' textAnchor="end" transform="rotate(-35)">{monthDayDate(payload.value)}</text>
        </g>
    );
}
  
function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
        <div className={`custom-tooltip colors-${payload[0].payload.index}`}>
            <p className="tooltip-date">{monthDayYearDate(label)}</p>
            <p className="tooltip-description">{payload[0].payload.description}</p>
            <p className="tooltip-duration">{`${payload[0].value} minutes`}</p>
            {payload[0].payload.heart_rate
                ? <p className="tooltip-heart-rate">{`${payload[0].payload.heart_rate} bpm`}</p>
                : null
            }
        </div>
        );
    }

    return null;
};
  