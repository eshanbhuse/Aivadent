"use client"
import { syncUser } from "@/lib/actions/users"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
function UserSync() {
  const {isSignedIn, isLoaded} = useUser()

  useEffect(() => {
    const handleUserSync = async () => {
        if(isLoaded && isSignedIn) {
            try{
                await syncUser()
            } catch (error) {
                console.log("Error syncing user:", error)
            }
        }
    }
    handleUserSync()
  }, [isSignedIn, isLoaded])
  return null
}

export default UserSync