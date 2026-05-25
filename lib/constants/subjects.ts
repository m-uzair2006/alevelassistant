import type { Subject } from "@/lib/types";

export const SUBJECTS: Record<
  Subject,
  {
    name: string;
    code: string;
    description: string;
  }
> = {
  physics_9702: {
    name: "Physics A Level",
    code: "9702",
    description: "Cambridge Physics",
  },
  maths_9709: {
    name: "Mathematics A Level",
    code: "9709",
    description: "Cambridge Mathematics",
  },
  cs_9618: {
    name: "Computer Science A Level",
    code: "9618",
    description: "Cambridge Computer Science",
  },
};

export const COMMAND_WORDS = {
  define: "Give the meaning of",
  explain: "Make clear the meaning of, or say how something works",
  analyze: "Examine in detail, breaking it down into components",
  evaluate: "Make judgement based on criteria, discussing strengths and weaknesses",
  compare: "Look at similarities and differences",
  contrast: "Look at differences only",
  calculate: "Find a numerical answer showing working",
  state: "Give a brief, factual answer",
  identify: "Name or recognize",
  describe: "Give an account in words",
  apply: "Use knowledge in a new situation",
  discuss: "Examine different aspects of a topic",
};

export const MARKING_CRITERIA = {
  excellent: {
    min: 80,
    max: 100,
    description: "Comprehensive, accurate, well-explained",
  },
  good: {
    min: 60,
    max: 79,
    description: "Generally accurate with minor gaps",
  },
  satisfactory: {
    min: 40,
    max: 59,
    description: "Basic understanding with some errors",
  },
  poor: {
    min: 20,
    max: 39,
    description: "Limited understanding, significant gaps",
  },
  very_poor: {
    min: 0,
    max: 19,
    description: "Minimal understanding",
  },
};
