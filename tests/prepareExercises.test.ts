import { describe, expect, it } from 'vitest';
import { prepareExercises, SESSION_SIZE } from '../src/lib/stage/prepareExercises';
import type { Exercise } from '../src/types/curriculum';

function ex(partial: Partial<Exercise>): Exercise {
  return {
    id: partial.id ?? 'ex-id',
    type: partial.type ?? 'multiple_choice',
    question: partial.question ?? 'Question?',
    answer: partial.answer ?? 'A',
    options: partial.options,
    pairs: partial.pairs,
    acceptableAnswers: partial.acceptableAnswers,
    xpReward: partial.xpReward ?? 10,
    difficulty: partial.difficulty ?? 'easy',
  };
}

describe('prepareExercises', () => {
  it('keeps only supported/valid exercise structures', () => {
    const input: Exercise[] = [
      ex({ id: 'mc-valid', type: 'multiple_choice', options: ['A', 'B', 'C'], answer: 'A' }),
      ex({ id: 'mc-invalid', type: 'multiple_choice', options: ['A', 'B'], answer: 'A' }),
      ex({ id: 'matching-valid', type: 'matching', pairs: [{ left: 'l1', right: 'r1' }, { left: 'l2', right: 'r2' }, { left: 'l3', right: 'r3' }] }),
      ex({ id: 'matching-invalid', type: 'matching', pairs: [{ left: 'l1', right: 'r1' }, { left: 'l2', right: 'r2' }] }),
      ex({ id: 'fill', type: 'fill_blank', answer: 'word' }),
      ex({ id: 'short', type: 'short_answer', answer: 'text' }),
      ex({ id: 'truefalse', type: 'true_false', answer: 'True' }),
      ex({ id: 'listening', type: 'listening', answer: 'spoken' }),
      ex({ id: 'writing', type: 'writing', answer: 'write this' }),
      ex({ id: 'no-answer', type: 'fill_blank', answer: '' }),
    ];

    const out = prepareExercises(input, 1234);
    const ids = new Set(out.map((o) => o.id));

    expect(ids.has('mc-valid')).toBe(true);
    expect(ids.has('matching-valid')).toBe(true);
    expect(ids.has('fill')).toBe(true);
    expect(ids.has('short')).toBe(true);
    expect(ids.has('truefalse')).toBe(true);
    expect(ids.has('listening')).toBe(true);
    expect(ids.has('writing')).toBe(true);

    expect(ids.has('mc-invalid')).toBe(false);
    expect(ids.has('matching-invalid')).toBe(false);
    expect(ids.has('no-answer')).toBe(false);
  });

  it('deduplicates by normalized type + question prefix', () => {
    const input: Exercise[] = [
      ex({ id: 'q1', type: 'fill_blank', question: '  What is this?   ', answer: 'A' }),
      ex({ id: 'q2', type: 'fill_blank', question: 'What   is   this?', answer: 'B' }),
      ex({ id: 'q3', type: 'short_answer', question: 'What is this?', answer: 'A' }),
    ];

    const out = prepareExercises(input, 1);
    const ids = out.map((o) => o.id);
    expect(ids).toContain('q3');
    expect(ids.filter((id) => id === 'q1' || id === 'q2').length).toBe(1);
  });

  it('is deterministic for the same seed', () => {
    const input = Array.from({ length: 20 }, (_, i) =>
      ex({
        id: `mc-${i}`,
        type: 'multiple_choice',
        question: `Q ${i}`,
        options: ['A', 'B', 'C'],
        answer: 'A',
      })
    );

    const a = prepareExercises(input, 99).map((e) => e.id);
    const b = prepareExercises(input, 99).map((e) => e.id);
    expect(a).toEqual(b);
  });

  it('changes order with different seed', () => {
    const input = Array.from({ length: 20 }, (_, i) =>
      ex({
        id: `mc-${i}`,
        type: 'multiple_choice',
        question: `Q ${i}`,
        options: ['A', 'B', 'C'],
        answer: 'A',
      })
    );

    const a = prepareExercises(input, 100).map((e) => e.id);
    const b = prepareExercises(input, 101).map((e) => e.id);
    expect(a).not.toEqual(b);
  });

  it('caps output size to session size', () => {
    const input = Array.from({ length: 50 }, (_, i) =>
      ex({
        id: `mc-${i}`,
        type: 'multiple_choice',
        question: `Question ${i}`,
        options: ['A', 'B', 'C'],
        answer: 'A',
      })
    );

    const out = prepareExercises(input, 42);
    expect(out.length).toBe(SESSION_SIZE);
  });
});

