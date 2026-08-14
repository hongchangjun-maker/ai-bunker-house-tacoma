import { describe, expect, it } from 'vitest';
import { floors, gallery, planningBaseline, systems } from './project';

describe('project data invariants', () => {
  it('defines exactly six contiguous underground levels', () => {
    expect(floors.map((floor) => floor.code)).toEqual(['B1', 'B2', 'B3', 'B4', 'B5', 'B6']);
  });

  it('keeps the concept program area at 13,000 square metres', () => {
    const total = floors.reduce((sum, floor) => sum + Number(floor.area.replace(/[^0-9]/g, '')), 0);
    expect(total).toBe(13_000);
  });

  it('keeps every zone schedule equal to its stated floor area', () => {
    for (const floor of floors) {
      const stated = Number(floor.area.replace(/[^0-9]/g, ''));
      const scheduled = floor.zones.reduce((sum, zone) => sum + zone.area, 0);
      expect(scheduled, `${floor.code} zone schedule`).toBe(stated);
    }
  });

  it('provides exactly 144 beds in the residential schedule', () => {
    const beds = planningBaseline.beds;
    expect(beds.familyBeds).toBe(beds.familySuites * 4);
    expect(beds.twinBeds).toBe(beds.twinRooms * 2);
    expect(beds.familyBeds + beds.twinBeds).toBe(planningBaseline.residents);
    expect(beds.total).toBe(144);
  });

  it('calculates five-year water and food planning demand', () => {
    expect(planningBaseline.durationDays).toBe(365 * 5);
    expect(planningBaseline.water.fiveYearLitres).toBe(
      planningBaseline.residents * planningBaseline.durationDays * planningBaseline.water.emergencyLitresPerPersonDay,
    );
    expect(planningBaseline.food.fiveYearKcal).toBe(
      planningBaseline.residents * planningBaseline.durationDays * planningBaseline.food.kcalPerPersonDay,
    );
  });

  it('links every floor to a unique responsive 3D plan', () => {
    expect(new Set(floors.map((floor) => floor.planBase)).size).toBe(6);
    expect(floors.every((floor) => floor.planWidths.length === 3)).toBe(true);
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
