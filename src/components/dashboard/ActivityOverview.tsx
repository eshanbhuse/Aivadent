import DentalHealthOverview from "./DentalHealthOverview"
import NextAppointment from "./NextAppointment"

function ActivityOverview() {
  return (
    <div className="flex flex-col gap-6 w-full">
        <DentalHealthOverview />
        <NextAppointment />
    </div>
  )
}

export default ActivityOverview