import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-12 w-full sm:w-80 bg-gray-200 rounded-lg"></div>
      </div>

      {/* URL Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <Card key={index} className="animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-48 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-4 w-full max-w-md bg-gray-200 rounded"></div>
                    <div className="flex items-center gap-4">
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Skeleton */}
      <div className="bg-gray-200 rounded-xl p-6 text-center">
        <div className="h-6 w-32 bg-gray-300 rounded mx-auto mb-2"></div>
        <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-1"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export default Loading;