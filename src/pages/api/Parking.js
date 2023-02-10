import { PrismaClient } from "@prisma/client";
import base32 from "base32";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const result = await prisma.parking.findMany({
            skip:(req.body.page-1)*10,
            take:10,
            orderBy:{
                check_in:"desc"
            },
        })
        res.status(200).json({
            result: result,
            total_page:Math.floor((await prisma.parking.count())/10),
            message: "success"
        })
    } else {
        res.status(200).json({
            result: 'API next.js',
            message: "success"
        })
    }
}
