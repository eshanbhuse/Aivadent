"use server"
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { AppointmentStatus } from "@prisma/client";

function transformAppointment(appointment: any) {
    return {
        ...appointment,
        patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
        patientEmail: appointment.user.email,
        doctorName: appointment.doctor.name,
        doctorImageUrl: appointment.doctor.imageUrl || "",
        date: appointment.date.toISOString().split('T')[0], 
    };
}
export async function getAppointments(clerkUserId: string) {
  // Find the user in the DB
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });

  if (!dbUser) {
    
    console.warn("User not found in DB:", clerkUserId);
    return [];
   
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId: dbUser.id },
    include: {
      doctor: {
        select: {
          name: true,
          imageUrl: true,
          specialty: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return appointments;
}

export async function getUserAppointments()
{
    try{
        const {userId} = await auth()
        if(!userId) throw new Error("You must be logged in to view an appointment");
        const user = await prisma.user.findUnique({where: {clerkId: userId}});
        if(!user) throw new Error("User not found");

        const appointments = await prisma.appointment.findMany({
            where: {userId: user.id},
            include:{
                user: {select : {firstName:true, lastName: true, email: true}},
                doctor: { select : { name: true, imageUrl: true}}
            },
            orderBy: [{date: "asc"}, {time: "asc"}]
        });
        return appointments.map(transformAppointment);
    } catch(error)
    {
        console.error("Error fetching user appointment:", error);
        throw new Error("Failed to fetch user appointments")
    }
}

export async function getUserAppointmentStats()
{
    try{
    const {userId} = await auth()
    if(!userId) throw new Error("You must be logged in to create an appointment");
    const user = await prisma.user.findUnique({where: {clerkId: userId}});
    if(!user) throw new Error("User not found");

    const [totalCount, completedCount] = await Promise.all([
        prisma.appointment.count({
            where: {userId: user.id},
        }),
        prisma.appointment.count({
            where: {
                userId: user.id,
                status: 'COMPLETED',
            },
        }),
    ]);
    return {
        totalAppointments:totalCount, 
        completedAppointments:completedCount
    };

    } catch (error) {
        console.error("Error creating appointment:", error);
        return { totalAppointments: 0, completedAppointments: 0 };
    }
}

export async function getBookedTimeSlots(doctorId: string,date: string) {
    try{
        const appointments = await prisma.appointment.findMany({where: {doctorId, date: new Date(date), status: {
            in: ["CONFIRMED", "COMPLETED"]
        },
    },
    select: {time: true},
    });
        return appointments.map((appointment) => appointment.time);
    } catch (error) {
        console.error("Error fetching booked time slots:", error);
        return [];
    }
}

interface BookAppointmentInput {
    doctorId: string;
    date: string;
    time: string;
    reason?: string;
}

export async function bookAppointment(input: BookAppointmentInput)
{
    try{
        const {userId} = await auth()
        if(!userId) throw new Error("You must be logged in to create an appointment");
        if(!input.doctorId || !input.date || !input.time)
            {
                throw new Error("Doctor, date, and time are required to book an appointment");
            }
        const user = await prisma.user.findUnique({
            where: {clerkId: userId}
        });
        if(!user) throw new Error("User not found");

        const appointment = await prisma.appointment.create({
            data: {
                userId: user.id,
                doctorId: input.doctorId,
                date: new Date(input.date),
                time: input.time,
                reason: input.reason || "General Checkup",
                status: "CONFIRMED",
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                doctor: {
                    select: {
                        name: true,
                        imageUrl: true,
                    },
                },
            },
        });
        return transformAppointment(appointment);
    } catch (error) {
        console.error("Error booking appointment:", error);
        throw new Error("Could not create appointment. Please try again later.");
    }

}

export async function updateAppointmentStatus(input: {id: string; status:AppointmentStatus}) {
    try{
        const appointment = await prisma.appointment.update({
            where: {id: input.id},
            data: {status: input.status},
        });
        return appointment;
    } catch (error) {
        console.error("Error updating appointment status:", error);
        throw new Error("Could not update appointment status. Please try again later.");
    }
}