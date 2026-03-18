export const ReviewTargetType = {
  Clinic: 1,
  Dentist: 2,
} as const;

export type ReviewTargetType =
  (typeof ReviewTargetType)[keyof typeof ReviewTargetType];

export type ReviewItem = {
  id: string;
  appointmentId: string;
  patientId: string;
  clinicId: string;
  dentistId: string;
  professionalRating: number;
  facilityRating: number;
  comment?: string | null;
  createdAt: string;
};

export type ReviewSummaryInfo = {
  id: string;
  targetId: string;
  targetType: ReviewTargetType;
  summary: string;
  version: number;
  createdAt: string;
  summaryFrom: string;
  summaryTo: string;
  sourceReviewCount?: number | null;
};

export type ReviewsOverviewData = {
  summary: ReviewSummaryInfo | null;
  reviews: ReviewItem[];
};

export type ReviewSummaryTarget = {
    targetId: string;
    targetType: ReviewTargetType;
};