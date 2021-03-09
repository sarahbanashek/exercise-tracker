import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export function ViewExerciseTypesData({loggedExerciseTypes, loggedExerciseTimeSpent}) {
    const colors = [
        '#003f5c',
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
        '#ffa600'
    ];
    return (
      <div id="view-exercise-types-data">
        <div id="pie-charts-title">Breakdown of Your Workout Types</div>
        <div id="frequency-pie-chart">
            <div className="individual-pie-chart-titles">Number of Times You've Logged Each Workout</div>
            <PieChart width={400} height={300}>
                <Pie data={loggedExerciseTypes} outerRadius="70%" label={entry => entry.description} dataKey="COUNT(exercise_events.id)">
                    {loggedExerciseTypes.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                    )}
                </Pie>
                <Tooltip content={<CustomTooltipFrequency />} />
            </PieChart>
            </div>
        <div id="total-time-pie-chart">
            <div className="individual-pie-chart-titles">Time You've Spent on Each Workout</div>
            <PieChart width={400} height={300}>
                <Pie data={loggedExerciseTimeSpent} outerRadius="70%" label={entry => entry.description} dataKey="SUM(duration)">
                    {loggedExerciseTimeSpent.map((_, i) => 
                        <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
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
        <div className="custom-tooltip">
            <p id="tooltip-date-description">{`You've logged ${payload[0].payload.description}`}</p>
            <p id="tooltip-duration">{`${payload[0].value} times`}</p>
        </div>
        );
    }

    return null;
};

function CustomTooltipTime({ active, payload }) {
    if (active) {
        return (
        <div className="custom-tooltip">
            <p id="tooltip-date-description">{`You've logged ${payload[0].payload.description}`}</p>
            <p id="tooltip-duration">{`for a total of ${payload[0].value} minutes`}</p>
        </div>
        );
    }

    return null;
};
