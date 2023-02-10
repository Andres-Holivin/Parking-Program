import { PrismaClient } from "@prisma/client";
import base32 from "base32";
import { prisma } from "helper/db";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log(req.query)
        const result = await prisma.parking.findMany({
            skip: (req.query.page - 1) * req.query.take,
            take: parseInt(req.query.take),
            orderBy: [
                {parking_status_id:"asc"},
                {check_in: "desc",}
            ],
            include: {
                vehicle: true,
                parking_status: true
            },
        })
        res.status(200).json({
            result: result,
            total_data: (await prisma.parking.count()),
            message: "success"
        })

    } else {
        res.status(200).json({
            result: 'API next.js',
            message: "success"
        })
    }
}
