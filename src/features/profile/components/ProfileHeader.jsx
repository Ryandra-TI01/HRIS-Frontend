import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function ProfileHeader({ user }) {
  const profile = user.profile;

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow border">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <Avatar className="h-20 w-20">
          <AvatarFallback>
            {user.name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            {user.name}
          </h2>

          <p className="text-neutral-600 dark:text-neutral-300">
            {profile.position} · {profile.department}
          </p>

          <p className="text-sm text-neutral-500 mt-1">
            Employee Code: {profile.employee_code}
          </p>
        </div>
      </div>
    </div>
  );
}
