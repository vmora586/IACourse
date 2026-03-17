import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReviewSummaryCard from "./ReviewSummaryCard";
import ReviewList from "./ReviewList";
import type { ReviewsOverviewData } from "./reviews.types";
import { ReviewTargetType } from "./reviews.types";
import ReviewSummaryCardSkeleton from "./ReviewSummaryCardSkeleton";
import ReviewListSkeleton from "./ReviewListSkeleton";

type ReviewsOverviewProps = {
  targetId: string;
  targetType: ReviewTargetType;
};

const ReviewsOverview = ({ targetId,
  targetType
}: ReviewsOverviewProps) => {

  const { error, isLoading, data:reviewsData } = useQuery<ReviewsOverviewData>({
    queryKey: ["reviews", targetId, targetType],
    queryFn: async () => {
      const response = await axios.get<ReviewsOverviewData>("http://localhost:5232/api/reviews/summary/by-targets",
      {
        params: {
          targetId,
          targetType
        },
      }
    );
    return response.data;
    }
  });


  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">There was an error fetching the reviews, please try again</p>
      </section>
    );
  }

  if (isLoading || !reviewsData?.summary) {
    return (
      <section className="space-y-6">
        <ReviewSummaryCardSkeleton />
        <ReviewListSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <ReviewSummaryCard summary={reviewsData?.summary ?? null} />
      <ReviewList reviews={reviewsData?.reviews ?? []} />
    </section>
  );
}

export default ReviewsOverview
