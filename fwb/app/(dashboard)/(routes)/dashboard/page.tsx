import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      <p className="flex justify-center text-yellow-200 font-bold"> YOU ARE NOW LOGGED IN TO FRIENDS WITH BENEFITS</p>
    <div className="flex justify-center">
      <UserButton afterSignOutUrl="/"/>
    </div>
    </div>
  )
}
