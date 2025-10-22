import { CalendarIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

function NoNextAppointments() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                No Upcoming Appointments
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-center py-8 text-muted-foreground">
                <div className="w-16 h-16 bg-muted/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 opacity-50" />
                </div>
                <p className="text-sm mb-3">
                    No upcoming appointments found. Please check back later or schedule a new appointment.
                </p>
                <Link href="/appointments">
                <Button size="sm" variant="outline" className="w-full">Schedule Appointment

                </Button>
                </Link>
            </div>
        </CardContent>
    </Card>
  )
}

export default NoNextAppointments