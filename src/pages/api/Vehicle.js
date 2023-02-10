import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const result = await prisma.vehicle.findMany()
        res.status(200).json({
            result: result,
            message: "success"
        })

    } else {
        res.status(200).json({
            result: 'API next.js',
            message: "success"
        })
    }
}
