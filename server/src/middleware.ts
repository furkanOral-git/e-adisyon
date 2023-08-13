import { NextFunction, Response, Request } from "express";


export function exceptionMiddleware(req: Request, res: Response, nextFunction: NextFunction) {

    try {

        nextFunction()
        res.status(200)
    }
    catch (error) {

        res.status(500).json({ Mesaj: "Sunucu Hatası", Hata: error })
    }
};

