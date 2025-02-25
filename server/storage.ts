import { type Visit, type Click, type InsertVisit, type InsertClick } from "@shared/schema";

export interface IStorage {
  createVisit(): Promise<Visit>;
  recordClick(visitId: number, linkId: string): Promise<Click>;
  updateVisitClicked(visitId: number): Promise<void>;
  getVisitStats(): Promise<{ total: number; clicked: number }>;
  getLinkStats(): Promise<Record<string, number>>;
}

export class MemStorage implements IStorage {
  private visits: Visit[] = [];
  private clicks: Click[] = [];
  private visitId: number = 1;
  private clickId: number = 1;

  async createVisit(): Promise<Visit> {
    const visit: Visit = {
      id: this.visitId++,
      timestamp: new Date(),
      hasClicked: 0
    };
    this.visits.push(visit);
    return visit;
  }

  async recordClick(visitId: number, linkId: string): Promise<Click> {
    const click: Click = {
      id: this.clickId++,
      visitId,
      linkId,
      timestamp: new Date()
    };
    this.clicks.push(click);
    return click;
  }

  async updateVisitClicked(visitId: number): Promise<void> {
    const visit = this.visits.find(v => v.id === visitId);
    if (visit) {
      visit.hasClicked = 1;
    }
  }

  async getVisitStats(): Promise<{ total: number; clicked: number }> {
    const total = this.visits.length;
    const clicked = this.visits.filter(v => v.hasClicked === 1).length;
    return { total, clicked };
  }

  async getLinkStats(): Promise<Record<string, number>> {
    const stats: Record<string, number> = {};
    for (const click of this.clicks) {
      stats[click.linkId] = (stats[click.linkId] || 0) + 1;
    }
    return stats;
  }
}

export const storage = new MemStorage();