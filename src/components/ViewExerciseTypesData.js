import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Heading, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { pieChartColors, tooltipBackgroundColors } from '../utilities/colors';

export function ViewExerciseTypesData({ loggedExerciseTypes, loggedExerciseTimeSpent }) {
    const frequencyTenPercent = (loggedExerciseTypes[1]['COUNT(exercise_events.id)'] * 0.1).toFixed(0);
    let frequencyOthers = [];
    let frequencyFinal = [{description: 'other', 'COUNT(exercise_events.id)': 0 }];
    loggedExerciseTypes[0].forEach(obj => {
        if (obj['COUNT(exercise_events.id)'] >= frequencyTenPercent) {
            frequencyFinal.push(obj);
        } else {
            frequencyOthers.push(obj.description);
            frequencyFinal[0]['COUNT(exercise_events.id)'] += obj['COUNT(exercise_events.id)'];
        }
    });

    // const timeTenPercent = (loggedExerciseTimeSpent[1]['SUM(duration)'] * 0.1).toFixed(0);
    let timeOthers = [];
    let timeFinal = [{description: 'other', 'SUM(duration)': 0}];
    loggedExerciseTimeSpent[0].forEach(obj => {
        if (obj['SUM(duration)'] >= 120) {
            timeFinal.push(obj);
        } else {
            timeOthers.push(obj.description);
            timeFinal[0]['SUM(duration)'] += obj['SUM(duration)'];
        }
    })
    
    function CustomTooltipFrequency({ active, payload }) {
        if (active) {
            return (
                payload[0].payload.description === 'other'
                ? (
                    <VStack 
                        bg={tooltipBackgroundColors[payload[0].name % backgroundColorsLength]}
                        border="2px"
                        borderRadius="lg" 
                        borderColor={payload[0].payload.fill}
                        p={3}
                    >
                        <Text size="sm">Less than {frequencyTenPercent} times each:</Text>
                        {frequencyOthers.map(type => <Text size="sm" key={type}>{type}</Text>)}
                    </VStack>)
                : (
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
                )
            );
        }
    
        return null;
    };

    function CustomTooltipTime({ active, payload }) {
        if (active) {
            return (
                payload[0].payload.description === 'other'
                ?(
                    <VStack 
                        bg={tooltipBackgroundColors[payload[0].name % backgroundColorsLength]}
                        border="2px"
                        borderRadius="lg" 
                        borderColor={payload[0].payload.fill}
                        p={3}
                    >
                        {/* <Text size="sm">Less than {(timeTenPercent / 60).toFixed(2)} hours each:</Text> */}
                        <Text size="sm">Less than 2 hours each:</Text>
                        {timeOthers.map(type => <Text size="sm" key={type}>{type}</Text>)}
                    </VStack>
                )
                : (
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
                )
            );
        }
    
        return null;
    };

    return (
        <VStack>
            <Heading size="md" p={2}>Breakdown of Your Workout Types</Heading>

            <Wrap justify="center">
                <WrapItem>
                    <VStack id="frequency-pie-chart">
                        <Heading size="sm">Number of Times You've Logged Each Workout</Heading>
                        <PieChart width={500} height={300}>
                            <Pie 
                                data={frequencyFinal} 
                                outerRadius="70%" 
                                label={entry => entry.description} 
                                dataKey="COUNT(exercise_events.id)"
                                startAngle={90}
                                endAngle={450}
                                isAnimationActive={false}
                            >
                                {frequencyFinal.map((_, i) => 
                                    <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                                )}
                            </Pie>
                            <Tooltip content={<CustomTooltipFrequency />} />
                        </PieChart>
                    </VStack>
                </WrapItem>

                <WrapItem>
                    <VStack id="total-time-pie-chart">
                        <Heading size="sm">Time You've Spent on Each Workout</Heading>
                        <PieChart width={500} height={300}>
                            <Pie 
                                data={timeFinal} 
                                outerRadius="70%" 
                                label={entry => entry.description} 
                                dataKey="SUM(duration)"
                                startAngle={90}
                                endAngle={450}
                                isAnimationActive={false}
                            >
                                {timeFinal.map((_, i) => 
                                    <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                                )}
                            </Pie>
                            <Tooltip content={<CustomTooltipTime />} />
                        </PieChart>
                    </VStack>
                </WrapItem>
            </Wrap>
        </VStack>
    );
}

const backgroundColorsLength = tooltipBackgroundColors.length;