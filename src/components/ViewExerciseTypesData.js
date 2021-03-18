import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { pieChartColors } from '../utilities/colors';

export function ViewExerciseTypesData({loggedExerciseTypes, loggedExerciseTimeSpent}) {
    return (
      <div id="view-exercise-types-data">
        <div id="pie-charts-title">Breakdown of Your Workout Types</div>
        <div id="frequency-pie-chart">
            <div className="individual-pie-chart-titles">Number of Times You've Logged Each Workout</div>
            <PieChart width={600} height={300}>
                <Pie data={loggedExerciseTypes} outerRadius="70%" label={entry => entry.description} dataKey="COUNT(exercise_events.id)">
                    {loggedExerciseTypes.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltipFrequency />} />
            </PieChart>
            </div>
        <div id="total-time-pie-chart">
            <div className="individual-pie-chart-titles">Time You've Spent on Each Workout</div>
            <PieChart width={600} height={300}>
                <Pie data={loggedExerciseTimeSpent} outerRadius="70%" label={entry => entry.description} nameKey='description' dataKey="SUM(duration)">
                    {loggedExerciseTimeSpent.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={pieChartColors[i % pieChartColors.length]} />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltipTime />} />
            </PieChart>
            </div>
      </div>
    );
}

function CustomTooltipFrequency({ active, payload }) {
    if (active) {
        return (
        <div className={`custom-tooltip colors-${pieChartColors.indexOf(payload[0].payload.fill)}`}>
            <p id="tooltip-date-description">{`You've logged ${payload[0].payload.description}`}</p>
            {payload[0].value === 1
                ? <p id="tooltip-duration">{`${payload[0].value} time`}</p>
                : <p id="tooltip-duration">{`${payload[0].value} times`}</p>
            }
        </div>
        );
    }

    return null;
};

function CustomTooltipTime({ active, payload }) {
    if (active) {
        return (
        <div className={`custom-tooltip colors-${pieChartColors.indexOf(payload[0].payload.fill)}`}>
            <p id="tooltip-duration">{`You've logged ${(payload[0].value / 60).toFixed(2)} hours`}</p>
            <p id="tooltip-date-description">{`of ${payload[0].payload.description}`}</p>
        </div>
        );
    }

    return null;
};
