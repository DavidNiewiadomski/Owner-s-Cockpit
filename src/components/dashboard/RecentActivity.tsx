
import React from 'react';

export function RecentActivity() {
  return (
    <div className="bg-black space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="border-b border-gray-700 pb-3 last:border-0 last:pb-0">
          <p className="font-medium text-white">Activity Update {item}</p>
          <p className="text-sm text-gray-400">Recent project activity will be shown here</p>
          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
        </div>
      ))}
    </div>
  );
}
