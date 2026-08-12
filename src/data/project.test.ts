import { describe, expect, it } from 'vitest';
import { floors, gallery, systems } from './project';

describe('project data invariants', () => {
  it('defines exactly six contiguous underground levels', () => {
    expect(floors.map((floor) => floor.code)).toEqual(['B1', 'B2', 'B3', 'B4', 'B5', 'B6']);
  });

  it('keeps the concept program area at 13,000 square metres', () => {
    const total = floors.reduce((sum, floor) => sum + Number(floor.area.replace(/[^0-9]/g, '')), 0);
    expect(total).toBe(13_000);
  });

  it('has complete floor and system descriptions', () => {
    expect(floors.every((floor) => floor.functions.length === 4 && floor.purpose.length > 10)).toBe(true);
    expect(systems).toHaveLength(8);
    expect(systems.every((system) => system.note.length > 10)).toBe(true);
  });

  it('labels every gallery item as generated concept material', () => {
    expect(gallery).toHaveLength(7);
    expect(gallery.every((item) => item.tag.includes('CONCEPT') || item.tag.includes('AI'))).toBe(true);
    expect(gallery.every((item) => item.alt.length > 20)).toBe(true);
  });
});
