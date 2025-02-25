import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { links } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/visits", async (req, res) => {
    const visit = await storage.createVisit();
    res.json(visit);
  });

  app.post("/api/clicks", async (req, res) => {
    const { visitId, linkId } = req.body;
    if (!visitId || !linkId) {
      res.status(400).json({ message: "Missing visitId or linkId" });
      return;
    }
    
    const click = await storage.recordClick(visitId, linkId);
    await storage.updateVisitClicked(visitId);
    res.json(click);
  });

  app.get("/api/stats", async (req, res) => {
    const visitStats = await storage.getVisitStats();
    const linkStats = await storage.getLinkStats();
    
    res.json({
      visits: visitStats,
      links: linkStats
    });
  });

  app.get("/api/links", (req, res) => {
    res.json(links);
  });

  const httpServer = createServer(app);
  return httpServer;
}
