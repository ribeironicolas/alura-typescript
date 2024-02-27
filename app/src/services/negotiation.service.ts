import { ImportNegotiation } from "../interfaces/import-negotiation.js";
import { Negotiation } from "../models/negotiation.js";

export class NegotiationService {
  async getNegotiations(): Promise<Negotiation[]> {
    return fetch("http://localhost:8080/dados")
      .then((res) => res.json())
      .then((negotiations: ImportNegotiation[]) => {
        return negotiations.map((negotiation) => {
          return new Negotiation(
            new Date(),
            negotiation.vezes,
            negotiation.montante
          );
        });
      });
  }
}
