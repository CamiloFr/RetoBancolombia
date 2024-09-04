import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRequest } from "../models/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getUser(email: string) {
        return this.http.get(`https://g13jxds3i0.execute-api.us-east-1.amazonaws.com/user`, { params: { email } });
    }

    createUser(userRequest: UserRequest) {
        return this.http.post(`https://g13jxds3i0.execute-api.us-east-1.amazonaws.com/user`, JSON.stringify(userRequest), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }});
    }

    updateUser(userRequest: UserRequest) {
        return this.http.put(`https://g13jxds3i0.execute-api.us-east-1.amazonaws.com/user`, userRequest);
    }

    deleteUser(email: string) {
        return this.http.delete(`https://g13jxds3i0.execute-api.us-east-1.amazonaws.com/user`, { params: { email } });
    }
}
