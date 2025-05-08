import bcrypt from 'bcrypt';

export interface UserInterface {
    id: number;
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}

export class User {
    id: number;
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;

    constructor(userData: UserInterface) {
        this.id = userData.id;
        this.username = userData.username;
        this.password = this.hashPassword(userData.password);
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
    }
    
    private hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10); 
        return bcrypt.hashSync(password, salt);
    }

    public isPasswordValid(rawPassword: string): boolean {
        return bcrypt.compareSync(rawPassword, this.password);
    }
}


