import React from "react";

export default function ProfileCard({ user = {} }) {
  return (
    <div className="bg-white/5 dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-white/6">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full ring-2 ring-white/6 object-cover"
        />
        <div>
          <div className="text-lg font-semibold">{user.name}</div>
          <div className="text-sm text-muted-foreground">{user.email}</div>
          <div className="mt-2 text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-emerald-600/10 text-emerald-400 text-xs font-medium">
              {user.role || "Employee"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-white/3 rounded-lg">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-sm font-medium mt-1">{user.status || "Active"}</div>
        </div>

        <div className="p-3 bg-white/3 rounded-lg">
          <div className="text-xs text-muted-foreground">Joined</div>
          <div className="text-sm font-medium mt-1">{user.joined || "2023-01-01"}</div>
        </div>
      </div>
    </div>
  );
}
