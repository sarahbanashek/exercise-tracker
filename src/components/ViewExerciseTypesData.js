import { PieChart, Pie, Cell, Tooltip } from 'recharts';

export function ViewExerciseTypesData({loggedExerciseTypes}) {
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
        <PieChart width={300} height={300}>
            <Pie data={loggedExerciseTypes} label dataKey="COUNT(exercise_events.id)">
                {loggedExerciseTypes.map((type, i) => 
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                )}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    );
}

function CustomTooltip({ active, payload }) {
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
