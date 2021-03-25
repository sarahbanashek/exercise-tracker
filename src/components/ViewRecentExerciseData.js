import { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Label } from 'recharts';
import { durationColor, heartRateColor, tooltipBorderColors, tooltipBackgroundColors } from '../utilities/colors';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { monthDayYearDate } from '../utilities/monthDayYearDate';

export function ViewRecentExerciseData({last20}) {
  last20.forEach((obj, i) => obj.index = i);
    return (
      <VStack paddingTop={10} paddingBottom={10}>
        <Heading size="md">Your Last 20 Workouts</Heading>
        <ResponsiveContainer className="duration-chart" width="90%" height={600}>
          <LineChart margin={{top: 50, bottom: 50, left: 25}} data={last20}>
            <XAxis 
              dataKey="date" 
              reversed padding={{left: 15, right: 15}} 
              axisLine={{stroke: 'black'}} 
              tickLine={{stroke: 'black'}} 
              tick={<CustomXAxisTick />}
            >
              <Label value="Date" 
                offset={20} 
                position="bottom" 
                fill="black" 
              />
            </XAxis>

            <YAxis 
              yAxisId="left" 
              dataKey="duration" 
              axisLine={{stroke: durationColor}} 
              tickLine={{stroke: durationColor}} 
              tick={{fill: 'black'}}
            >
              <Label value="Workout Length (minutes)" 
                angle={-90} 
                offset={0} 
                dy={-95} 
                position="left" 
                fill="black" 
              />
            </YAxis>

            <YAxis 
              yAxisId="right" 
              orientation="right" 
              axisLine={{stroke: heartRateColor}} 
              tickLine={{stroke: heartRateColor}} 
              tick={{fill: 'black'}}
            >
              <Label value="Heart Rate (bpm)" 
                angle={-90} 
                offset={-50} 
                dy={-70} 
                position="left" 
                fill="black" 
              />
            </YAxis>

            <Line yAxisId="left" 
              type="linear" 
              dataKey="duration" 
              stroke={durationColor} 
              strokeWidth={2} 
            />
            <Line yAxisId="right" 
              type="linear" 
              dataKey="heart_rate" 
              stroke={heartRateColor} 
              strokeWidth={2} 
              connectNulls
            />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </VStack>
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
  const dateString = info.split('-');
  return `${months[dateString[1]]} ${parseInt(dateString[2], 10)}`
}
  
function CustomXAxisTick({x, y, _, payload}) {
    return(
      <g transform={`translate(${x}, ${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={5} 
          fontSize='12px' 
          textAnchor="end" 
          transform="rotate(-35)"
        >{monthDayDate(payload.value)}</text>
      </g>
    );
}
  
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <VStack 
        bg={tooltipBackgroundColors[payload[0].payload.index % tooltipBackgroundColors.length]}
        border="2px"
        borderRadius="lg" 
        borderColor={tooltipBorderColors[payload[0].payload.index % tooltipBorderColors.length]} 
        p={3}
      >
        {/* date */}
        <Text size="lg">{monthDayYearDate(label)}</Text>
        {/* exercise type */}
        <Text size="sm">{payload[0].payload.description}</Text>
        {/* duration */}
        <Text size="sm" color={durationColor}>{`${payload[0].value} minutes`}</Text>
        {/* heart rate */}
        {payload[0].payload.heart_rate
          ? <Text size="sm" color={heartRateColor}>{`${payload[0].payload.heart_rate} bpm`}</Text>
          : null
        }
      </VStack>
    );
  }

  return null;
};
  