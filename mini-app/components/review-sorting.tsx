"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface Review {
  id: string;
  text: string;
}

export interface ReviewSortingProps {
  reviews: Review[];
}

export function ReviewSorting({ reviews }: ReviewSortingProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [suggestion, setSuggestion] = useState("");

  const analyzeSentiment = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("good") || lower.includes("great") || lower.includes("excellent")) {
      return "Positive";
    }
    if (lower.includes("bad") || lower.includes("terrible") || lower.includes("poor")) {
      return "Negative";
    }
    return "Neutral";
  };

  const generateSuggestion = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "Thank you for your positive feedback! We're glad you enjoyed our service.";
      case "Negative":
        return "We're sorry to hear about your experience. Please let us know how we can improve.";
      default:
        return "Thank you for your feedback. We appreciate your input.";
    }
  };

  const handleSelect = (review: Review) => {
    setSelectedReview(review);
    const sentiment = analyzeSentiment(review.text);
    setSuggestion(generateSuggestion(sentiment));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Card key={review.id} onClick={() => handleSelect(review)} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{analyzeSentiment(review.text)}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{review.text}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedReview && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Response</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={suggestion} readOnly className="w-full" />
            <Button onClick={() => navigator.clipboard.writeText(suggestion)} className="mt-2">
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
