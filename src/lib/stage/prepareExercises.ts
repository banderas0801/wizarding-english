import type { Exercise } from '../../types/curriculum';
import { seededShuffle } from '../seededRandom';

export const SESSION_SIZE = 10;

function fixText(s: string): string {
  return (s ?? '').replace(/\s+/g, ' ').trim();
}

export function prepareExercises(all: Exercise[], seed: number): Exercise[] {
  const seen = new Set<string>();
  const filtered = all
    .filter((e) => {
      if (!e.answer) return false;
      if (e.type === 'fill_blank' || e.type === 'short_answer') return true;
      if (e.type === 'true_false') return true;
      if (e.type === 'pronunciation' || e.type === 'listening' || e.type === 'writing') return true;
      if (e.type === 'multiple_choice') return Boolean(e.options && e.options.length >= 3);
      if (e.type === 'matching') return Boolean(e.pairs && e.pairs.length >= 3 && e.pairs.length <= 6);
      return false;
    })
    .filter((e) => {
      const key = `${e.type}:${fixText(e.question).slice(0, 60)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return seededShuffle(filtered, seed).slice(0, SESSION_SIZE);
}

