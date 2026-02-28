"use client"

export function StatCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 border-l-4 border-l-gray-300 dark:border-l-gray-700 animate-pulse bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </td>
      <td className="p-4">
        <div className="h-5 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </td>
      <td className="p-4">
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
      </td>
      <td className="p-4">
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </td>
      <td className="p-4 hidden md:table-cell">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </td>
      <td className="p-4">
        <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
      </td>
    </tr>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div>
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
        <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Table skeleton */}
      <div className="border rounded-lg bg-white dark:bg-gray-900">
        <div className="p-6 border-b">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <table className="w-full">
          <tbody>
            {[...Array(5)].map((_, i) => (
              <TableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ModalMessageSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="h-20 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  )
}

export function UploadCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden animate-pulse bg-white dark:bg-gray-900">
      {/* Image area */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      {/* Content area */}
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}

export function UploadsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 animate-pulse bg-white dark:bg-gray-900">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="border rounded-lg bg-white dark:bg-gray-900">
        <div className="p-6 border-b">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <UploadCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SessionDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Session info card skeleton */}
      <div className="border rounded-lg bg-white dark:bg-gray-900">
        <div className="p-6 border-b">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="border rounded-lg bg-white dark:bg-gray-900">
        <div className="p-6 border-b">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="p-6 space-y-6">
          {[...Array(4)].map((_, i) => (
            <ModalMessageSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
