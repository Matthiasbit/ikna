import { Request, Response } from "express";
import jwt from "jsonwebtoken";


export type JwtPayload = {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

export function getVerifiedToken(req: Request, res: Response): JwtPayload | undefined {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(401).json({error : "Kein Token vorhanden"});
        return;
    }
    try{
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err){
        console.error(err);
        res.status(401).json({error: " Ungültiger Token"});
        return;
    }
}