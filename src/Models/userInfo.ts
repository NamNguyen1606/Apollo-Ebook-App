/* eslint-disable prettier/prettier */
export default class UserInfo {
    id: string = '';
    username: string = '';
    name: string = '';
    email: string = '';
    token: string = '';

    constructor(id: string, username: string, name: string, email: string, token: string){
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.token = token;
    }
}