import { Pronostic } from './pronostic.model'
export class Joueur {
    id: number;
    name: string;
    password : string;
    score: number;
    position: number;
    pronostics: Pronostic[];

    constructor(id: number, name: string, password: string, position: number, score: number){
        this.id = id;
        this.name = name;
        this.password = password;
        this.score = score;
        this.position = position;
        this.pronostics = [];
        
    }
}