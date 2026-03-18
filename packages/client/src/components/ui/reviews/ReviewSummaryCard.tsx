import type { ReviewSummaryInfo } from "./reviews.types";
import { IoSparklesSharp } from "react-icons/io5";

type ReviewSummaryCardProps = {
    summary: ReviewSummaryInfo | null;
    isGenerating?: boolean;
    generateError?: string | null;
    onGenerateSummary: () => void;
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const ReviewSummaryCard = ({
    summary,
    isGenerating = false,
    generateError,
    onGenerateSummary,
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
                <button
                    className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    disabled={isGenerating}
                    onClick={onGenerateSummary}
                    type="button"
                >
                    <IoSparklesSharp className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                    {isGenerating ? "Generating summary..." : "Generate Summary"}
                </button>
                {generateError ? (
                    <p className="mt-3 text-sm font-medium text-red-600">
                        {generateError}
                    </p>
                ) : null}
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
