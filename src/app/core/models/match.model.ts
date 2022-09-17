export class Match {
    id: number;
    team1: string;
    team2: string;
    gap : number;
    winner: string;
    reverse: boolean;

    constructor(id: number, team1: string, team2: string, gap: number, winner: string, reverse: boolean){
        this.id = id;
        this.team1 = team1;
        this.team2 = team2;
        this.gap = gap;
        this.winner = winner;
        this.reverse = reverse;
    }
}