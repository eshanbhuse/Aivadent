"use client"
import { bookAppointment, getAppointments, getBookedTimeSlots, updateAppointmentStatus } from "@/lib/actions/appointments";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// export function useGetAppointments() {
//     const result = useQuery({
//         queryKey: ['getAppointments'],
//         queryFn: getAppointments
//     });
//     return result;
// }    
export function useGetAppointments() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['getAppointments', user?.id], 
    queryFn: async ({ queryKey }) => {
      const [, clerkUserId] = queryKey; 
      if (!clerkUserId) return [];
      return getAppointments(clerkUserId as string); 
    },
    enabled: !!user, 
  });
}                   
export function useBookedTimeSlots(doctorId: string, date: string) {
    return useQuery({
        queryKey: ['getBookedTimeSlots'],
        queryFn: () => getBookedTimeSlots(doctorId!, date),
        enabled: !!doctorId && !!date,
    });
}                      

export function useBookAppointment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: bookAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUserAppointments'] });
        },
        onError: (error) => {
            console.error("Error booking appointment:", error);
        }
    });
}

// export function useUserAppointments() {
//       const { user } = useUser();
//     return useQuery({
//         queryKey: ['getUserAppointments', user?.id],
//         queryFn: getAppointments,
//     });
// }

export function useUserAppointments() {
  const { user } = useUser();

  return useQuery({
    queryKey: ['getUserAppointments', user?.id],
    queryFn: async ({ queryKey }) => {
      const [, clerkUserId] = queryKey;
      if (!clerkUserId) return [];
      return getAppointments(clerkUserId as string); 
    },
    enabled: !!user,
  });
}

export function useUpdateAppointmentStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAppointmentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getAppointments'] });
        },
        onError: (error) => {
            console.error("Error updating appointment status:", error);
        }
    });   
        }
