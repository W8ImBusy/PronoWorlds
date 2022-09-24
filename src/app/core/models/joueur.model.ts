import { Pronostic } from './pronostic.model'
export class Joueur {
    email: string;
    nickname: string;
    score: number;

    constructor(email: string, nickname: string, password: string, score: number){
        this.email = email;
        this.nickname = nickname;
        this.score = score;        
    }
}