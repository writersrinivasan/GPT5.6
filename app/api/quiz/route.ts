import { NextRequest, NextResponse } from "next/server";
import { quizQuestions } from "@/data/curriculum";

export async function GET() {
  return NextResponse.json({ questions: quizQuestions });
}

export async function POST(req: NextRequest) {
  const { questionId, answer } = await req.json();
  const question = quizQuestions.find((q) => q.id === questionId);
  if (!question) return NextResponse.json({ error: "Question not found" }, { status: 404 });

  const isCorrect = answer === question.correct;
  return NextResponse.json({
    correct: isCorrect,
    explanation: question.explanation,
    correctAnswer: question.correct,
  });
}
