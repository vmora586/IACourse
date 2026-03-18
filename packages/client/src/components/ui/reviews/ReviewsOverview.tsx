import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReviewSummaryCard from "./ReviewSummaryCard";
import ReviewList from "./ReviewList";
import type { ReviewSummaryInfo, ReviewsOverviewData } from "./reviews.types";
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
  const queryClient = useQueryClient();
  const queryKey = ["reviews", targetId, targetType] as const;

  const { error, isLoading, data:reviewsData } = useQuery<ReviewsOverviewData>({
    queryKey,
    queryFn: async () => {
      const response = await axios.get<ReviewsOverviewData>("http://localhost:5232/api/reviews/summary/by-target",
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

  const generateSummaryMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post<ReviewSummaryInfo>(
        "http://localhost:5232/api/reviews/summary",
        {
          targetId,
          targetType,
        }
      );

      return response.data;
    },
    onSuccess: async (summary) => {
      queryClient.setQueryData<ReviewsOverviewData>(queryKey, (currentData) => ({
        summary,
        reviews: currentData?.reviews ?? [],
      }));

      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const mutationErrorMessage = generateSummaryMutation.error ? "There was an error generating the summary, please try again." : "";
  
  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">There was an error fetching the reviews, please try again</p>
      </section>
    );
  }

  if (isLoading) {
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
        summary={reviewsData?.summary ?? null}
        isGenerating={generateSummaryMutation.isPending}
        generateError={mutationErrorMessage}
        onGenerateSummary={() => generateSummaryMutation.mutate()}
      />
      <ReviewList reviews={reviewsData?.reviews ?? []} />
    </section>
  );
}

export default ReviewsOverview
