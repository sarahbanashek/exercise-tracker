import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { pieChartColors, tooltipBackgroundColors } from '../utilities/colors';

export function ViewExerciseTypesData({loggedExerciseTypes, loggedExerciseTimeSpent}) {
    return (
      <Stack id="view-exercise-types-data">
        <Heading size="md">Breakdown of Your Workout Types</Heading>

        <VStack id="frequency-pie-chart">
            <Heading size="sm">Number of Times You've Logged Each Workout</Heading>
            <PieChart width={600} height={300}>
                <Pie data={loggedExerciseTypes} outerRadius="70%" label={entry => entry.description} dataKey="COUNT(exercise_events.id)">
                    {loggedExerciseTypes.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltipFrequency />} />
            </PieChart>
        </VStack>

        <VStack id="total-time-pie-chart">
            <Heading size="sm">Time You've Spent on Each Workout</Heading>
            <PieChart width={600} height={300}>
                <Pie data={loggedExerciseTimeSpent} outerRadius="70%" label={entry => entry.description} dataKey="SUM(duration)">
                    {loggedExerciseTimeSpent.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltipTime />} />
            </PieChart>
        </VStack>
      </Stack>
    );
}

const backgroundColorsLength = tooltipBackgroundColors.length;

function CustomTooltipFrequency({ active, payload }) {
    if (active) {
        return (
        <VStack 
            bg={tooltipBackgroundColors[payload[0].name % backgroundColorsLength]}
            border="2px"
            borderRadius="lg" 
            borderColor={payload[0].payload.fill}
            p={3}
        >
            <Text size="sm">You've logged</Text>
            <Text size="sm">{payload[0].payload.description}</Text>
            {payload[0].value === 1
                ? <Text size="sm">{`${payload[0].value} time`}</Text>
                : <Text size="sm">{`${payload[0].value} times`}</Text>
            }
        </VStack>
        );
    }

    return null;
};

function CustomTooltipTime({ active, payload }) {
    if (active) {
        return (
            <VStack 
                bg={tooltipBackgroundColors[payload[0].name % backgroundColorsLength]}
                border="2px"
                borderRadius="lg" 
                borderColor={payload[0].payload.fill}
                p={3}
            >
                <Text size="sm">{`You've logged ${(payload[0].value / 60).toFixed(2)} hours`}</Text>
                <Text size="sm">{`of ${payload[0].payload.description}`}</Text>
            </VStack>
        );
    }

    return null;
};
