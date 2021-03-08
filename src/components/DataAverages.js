export function DataAverages({averages}) {
    return (
      <div id="display data averages">
        <div id="avg-workout-length">
          Your average workout length is {averages.duration} minutes.
        </div>
        <div id="avg-heart-rate">
          Your average heart rate is {averages.heartRate} beats per minute.
        </div>
      </div>
    )
}