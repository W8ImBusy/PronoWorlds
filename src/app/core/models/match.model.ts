export class Match {
    team1: string;
    team2: string;
    winner: string;
    score: string;
    type: string;

    constructor( team1: string, team2: string, winner: string, score: string, type: string){
        this.team1 = team1;
        this.team2 = team2;
        this.winner = winner;
        this.score = score;
        this.type = type;
    }
}