import bcrypt from 'bcrypt';

export interface UserInterface {
    id: number;
    name: string;
    password: string;
    email: string;
    hashed?: boolean; 
}

export class User {
    id: number;
    name: string;
    password: string;
    email: string;

    constructor(userData: UserInterface) {
        this.id = userData.id;
        this.name = userData.name;
        this.email = userData.email;
        this.password = userData.hashed
            ? userData.password 
            : this.hashPassword(userData.password);
    }

    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    public isPasswordValid(rawPassword: string): boolean {
        return bcrypt.compareSync(rawPassword, this.password);
    }
}

