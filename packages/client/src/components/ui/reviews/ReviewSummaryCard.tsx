import type { ReviewSummaryInfo } from "./reviews.types";

type ReviewSummaryCardProps = {
    summary: ReviewSummaryInfo | null;
    isLoading?: boolean;
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const ReviewSummaryCard = ({
    summary
}: ReviewSummaryCardProps) => {
    if (!summary) {
        return (
            <section className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-6">
                <p className="text-sm font-medium text-stone-700">
                    No summary available yet.
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                    Reviews exist, but a generated summary is not available for this entity yet.
                </p>
            </section>
        );
    }

    return (
        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                        Review Summary
                    </p>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-stone-800">
                        {summary.summary}
                    </p>
                </div>

                <div className="min-w-55 rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">
                    <p>
                        <span className="font-medium text-stone-800">Generated:</span>{" "}
                        {formatDate(summary.createdAt)}
                    </p>
                    <p className="mt-2">
                        <span className="font-medium text-stone-800">Coverage:</span>{" "}
                        {formatDate(summary.summaryFrom)} - {formatDate(summary.summaryTo)}
                    </p>
                    <p className="mt-2">
                        <span className="font-medium text-stone-800">Reviews used:</span>{" "}
                        {summary.sourceReviewCount ?? 0}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReviewSummaryCard
