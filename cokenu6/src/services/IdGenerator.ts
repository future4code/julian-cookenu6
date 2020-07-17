import { v4 } from 'uuid';

export class IdGenerator {  // gera o um ID
    public generate(): string {
        return v4();
    }
}