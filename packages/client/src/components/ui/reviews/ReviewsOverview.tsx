import axios from "axios";
import { useEffect, useState } from "react";
import ReviewSummaryCard from "./ReviewSummaryCard";
import ReviewList from "./ReviewList";
import type { ReviewsOverviewData } from "./reviews.types";
import { ReviewTargetType } from "./reviews.types";

type ReviewsOverviewProps = {
    targetId: string;
    targetType: ReviewTargetType;
};

const ReviewsOverview = ({ targetId,
    targetType
}: ReviewsOverviewProps) => {

    const [data, setData] = useState<ReviewsOverviewData>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadReviews = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await axios.get<ReviewsOverviewData>("http://localhost:5232/api/reviews/summary/by-target",
                    {
                        params: {
                            targetId,
                            targetType
                        },
                        signal: controller.signal,
                    }
                );
                setData(response.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                setError("Unable to load reviews at the moment");
            } finally {
                setIsLoading(false);
            }
        }

        loadReviews();

        return () => controller.abort();
    }, [targetId, targetType]);

    if (isLoading) {
    return (
      <section className="space-y-6">
        <ReviewSummaryCard summary={null} isLoading />
        <div className="rounded-3xl border border-stone-200 bg-white p-6">
          <p className="text-sm text-stone-500">Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">{error}</p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <ReviewSummaryCard summary={data?.summary ?? null} />
      <ReviewList reviews={data?.reviews ?? []} />
    </section>
  );
}

export default ReviewsOverview
