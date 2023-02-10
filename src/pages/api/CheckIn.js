import { PrismaClient } from "@prisma/client"
import base32 from "base32";
import { prisma } from "helper/db";
export default async function handler(req, res) {    
    if (req.method === 'POST') {
        console.log(req.body);
        req.body.plate=req.body.plate.toString().toLowerCase();
        const timestampnow = Math.floor(new Date().getTime() / 1000);
        const ticket = base32.encode(timestampnow + "|" + req.body.plate).toUpperCase();
        const check = await prisma.parking.findFirst({
            where: {
                plate: req.body.plate,
                parking_status_id: 1,
            }
        })
        if (check !== null) {
            check.check_out = timestampnow;
            check.duration = `${Math.floor((timestampnow - check.check_in) / 3600)} Hour ${Math.floor(Math.floor((timestampnow - check.check_in) % 3600) / 60)} Minute`
            check.price = Math.floor((timestampnow - check.check_in) / 3600) * 3000
            res.status(500).json({
                result: check,
                message: "Vehicle is already in Parking area"
            })
            return;
        }
        const result = await prisma.parking.create({
            data: {
                vehicle_id: req.body.type,
                plate: req.body.plate,
                ticket: ticket,
                parking_status_id: 1,
                check_in: timestampnow,
            }
        })
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
