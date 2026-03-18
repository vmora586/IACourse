import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReviewSummaryCard from "./ReviewSummaryCard";
import ReviewList from "./ReviewList";
import type { ReviewSummaryInfo, ReviewSummaryTarget, ReviewsOverviewData } from "./reviews.types";
import ReviewSummaryCardSkeleton from "./ReviewSummaryCardSkeleton";
import ReviewListSkeleton from "./ReviewListSkeleton";
import { generateReviewSummary, getReviewsOverview } from "./review.service";



  const ReviewsOverview = ({ targetId, targetType }: ReviewSummaryTarget) => {
  const queryClient = useQueryClient();
  const queryKey = ["reviews", targetId, targetType] as const;

  const getReviewsQuery = useQuery<ReviewsOverviewData>({
    queryKey,
    queryFn: () => getReviewsOverview({ targetId, targetType }),
  });

const generateSummaryMutation = useMutation({
    mutationFn: () => generateReviewSummary({ targetId, targetType }),
    onSuccess: async (summary: ReviewSummaryInfo) => {
      queryClient.setQueryData<ReviewsOverviewData>(queryKey, (currentData) => ({
        summary,
        reviews: currentData?.reviews ?? [],
      }));

      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const mutationErrorMessage = generateSummaryMutation.error ? "There was an error generating the summary, please try again." : "";

  if (getReviewsQuery.error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">There was an error fetching the reviews, please try again</p>
      </section>
    );
  }

  if (getReviewsQuery.isLoading) {
    return (
      <section className="space-y-6">
        <ReviewSummaryCardSkeleton />
        <ReviewListSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <ReviewSummaryCard
        summary={getReviewsQuery.data?.summary ?? null}
        isGenerating={generateSummaryMutation.isPending}
        generateError={mutationErrorMessage}
        onGenerateSummary={() => generateSummaryMutation.mutate()}
      />
      <ReviewList reviews={getReviewsQuery.data?.reviews ?? []} />
    </section>
  );
}

export default ReviewsOverview
