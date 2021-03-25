import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Wrap,
  WrapItem
} from "@chakra-ui/react"

export function DataAverages({averages}) {

    return (
      <Wrap align="center" justify="center" spacing="15%" p={5}>
        <WrapItem>
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
        </WrapItem>

        <WrapItem>
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
        </WrapItem>
      </Wrap>
    );
}