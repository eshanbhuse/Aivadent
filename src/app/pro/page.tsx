import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function ProPage() {
    const user = await currentUser();
    if (!user) {
      redirect('/');
    }
  return (
    <>
        <Navbar />
        
    </>
    
  );
}
export default ProPage;