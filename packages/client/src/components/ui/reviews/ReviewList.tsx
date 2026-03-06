import type { ReviewItem } from "./reviews.types";

type ReviewListProps = {
  reviews: ReviewItem[];
}


const ReviewList = ({ reviews }: ReviewListProps) => {
  if (!reviews.length) {
    return <p>No reviews available yet.</p>;
  }

  return (
    <section className="space-y-4">
      {
        reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-3 flex gap-4 text-sm">
              <span>
                Professional: <strong>{review.professionalRating.toFixed(1)}/5</strong>
              </span>
              <span>
                Facility: <strong>{review.facilityRating.toFixed(1)}/5</strong>
              </span>
            </div>

            <p className="text-sm leading-6 text-neutral-700">
              {review.comment?.trim() || "No written comment provided"}
            </p>

          </article>
        ))
      }
    </section>
  )
}

export default ReviewList
