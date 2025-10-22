export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-card rounded-lg p-6 animate-pulse">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-secondary" />
            <div className="flex-1">
              <div className="h-5 bg-secondary rounded w-3/4 mb-2" />
              <div className="h-4 bg-secondary rounded w-1/2" />
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-secondary rounded" />
            <div className="h-4 bg-secondary rounded" />
            <div className="h-4 bg-secondary rounded w-2/3" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 bg-secondary rounded flex-1" />
            <div className="h-9 bg-secondary rounded flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
};
