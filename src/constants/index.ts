import { Review } from "../common";

export const whatsAppUrl: string = `https://wa.me/+2348108816975`;
export type Faq = {
  question: string;
  answers: string[];
};

export const faqs: Faq[] = [
  {
    question: "How do I get started on the website?",
    answers: [
      "Visit  the website chinosexchange.con and click on sign up",
      "Put in your information as requested",
      "Verify your email address with the link sent to you email",
    ],
  },
  {
    question: "How do I get started on the website?",
    answers: [
      "Visit  the website chinosexchange.con and click on sign up",
      "Put in your information as requested",
      "Verify your email address with the link sent to you email",
    ],
  },
  {
    question: "How do I get started on the website?",
    answers: [
      "Visit  the website chinosexchange.con and click on sign up",
      "Put in your information as requested",
      "Verify your email address with the link sent to you email",
    ],
  },
];

export const appReviews: Review[] = [
  {
    fullName: "Collins Obinna",
    stars: 4.2,
    review:
      "I absolutely love the e-library! It's like having a treasure trove of knowledge at my fingertips. Whether it's for research or leisure reading, I can easily access a wide variety of books and resources from the comfort of my home.",
  },
  {
    fullName: "Bob Daniel",
    stars: 5,
    review:
      "The e-library has revolutionized the way I study. Being able to borrow and read books digitally saves me so much time, and the search features make finding relevant materials a breeze. It's made my academic journey so much smoother!",
  },
  {
    fullName: "Blake Joshua",
    stars: 4.2,
    review:
      "I can't praise the e-library enough. As a busy professional, having access to e-books on my tablet during my commute or downtime is a game-changer. It's like having my personal library with me everywhere I go.",
  },
  {
    fullName: "Princess Amaka",
    stars: 5,
    review:
      "The e-library has made learning a joy for my kids. They love browsing through children's e-books and interactive content. It's made reading fun and engaging for them, and I'm grateful for such a fantastic resource.",
  },
];
