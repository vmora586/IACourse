import Skeleton from "react-loading-skeleton";

const ReviewSummaryCardSkeleton = () => {
  return (
    <section className="rounded-3xl border border-stone-200 bg-white p-6">
                <div className="space-y-3">
                    <Skeleton height={16} width="30%"></Skeleton>
                    <Skeleton height={24}></Skeleton>
                    <Skeleton height={24} width="85%"></Skeleton>
                    <Skeleton height={16} width="50%"></Skeleton>
                </div>
            </section>
  )
}

export default ReviewSummaryCardSkeleton