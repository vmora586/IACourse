import Skeleton from "react-loading-skeleton";

const ReviewListSkeleton = () => {
  return (
   <section className="space-y-4">
        {[1, 2, 3].map((i) => (
            <article
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
                <div className="mb-3 flex items-center justify-between">
                    <Skeleton height={16} width="25%" />
                </div>

                <div className="mb-3 flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Skeleton height={16} width="80px" />
                        <Skeleton height={20} width="100px" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton height={16} width="60px" />
                        <Skeleton height={20} width="100px" />
                    </div>
                </div>

                <Skeleton height={16} count={2} />
            </article>
        ))}
    </section>
  )
}

export default ReviewListSkeleton