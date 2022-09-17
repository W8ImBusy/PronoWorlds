export class Pronostic {
    id: number;
    gap: number;
    winner: string;
    reverse: boolean;

    constructor(id: number, gap: number, winner: string, reverse: boolean){
        this.id = id;
        this.winner = winner;
        this.reverse = reverse;
        this.gap = gap;
    }
}