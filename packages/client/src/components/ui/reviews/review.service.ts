import axios from "axios";
import type { ReviewsOverviewData, ReviewSummaryInfo, ReviewSummaryTarget } from "./reviews.types";

const REVIEWS_BASE_URL = "http://localhost:5232/api/reviews";

export const getReviewsOverview = async ({
    targetId,
    targetType,
}: ReviewSummaryTarget): Promise<ReviewsOverviewData> => {
    const response = await axios.get<ReviewsOverviewData>(
        `${REVIEWS_BASE_URL}/summary/by-target`,
        {
            params: { targetId, targetType },
        }
    );

    return response.data;
};

export const generateReviewSummary = async ({
    targetId,
    targetType
}: ReviewSummaryTarget): Promise<ReviewSummaryInfo> => {
    const response = await axios.post<ReviewSummaryInfo>(
        `${REVIEWS_BASE_URL}/summary`,
        { targetId, targetType }
    );

    return response.data;
};