import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react"

export function DataAverages({averages}) {

    return (
      <StatGroup p={5}>
        <Stat>
          <StatLabel>Average Workout Length</StatLabel>
          <StatNumber>{averages.totalDuration}</StatNumber>
          <StatHelpText>minutes</StatHelpText>
          <StatHelpText>
            <StatArrow type={averages.totalDuration > averages.untilLastWeekDuration
                              ? 'increase'
                              : 'decrease'
                            } />
            {(100 * Math.abs(averages.totalDuration - averages.untilLastWeekDuration) / averages.untilLastWeekDuration).toFixed(2)}% this week
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Average Heart Rate</StatLabel>
          <StatNumber>{averages.totalHeartRate}</StatNumber>
          <StatHelpText>
            beats per minute
          </StatHelpText>
          <StatHelpText>
            <StatArrow type={averages.totalHeartRate > averages.untilLastWeekHeartRate
                              ? 'increase'
                              : 'decrease'
                            } />
            {(100 * Math.abs(averages.totalHeartRate - averages.untilLastWeekHeartRate) / averages.untilLastWeekHeartRate).toFixed(2)}% this week
          </StatHelpText>
        </Stat>
      </StatGroup>
    );
}