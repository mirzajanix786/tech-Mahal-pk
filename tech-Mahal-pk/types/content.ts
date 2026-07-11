export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number; // 0–5
  review: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
