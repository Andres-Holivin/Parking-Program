import { Prisma, PrismaClient } from "@prisma/client";
import base32 from "base32";
import { prisma } from "helper/db";

export default async function handler(req, res) {

    if (req.method === 'GET') {
        const timestampnow = Math.floor(Date.now() / 1000);
        const ticketDecode = base32.decode(req.query.ticket);
        const result = await prisma.parking.findFirst({
            where: {
                ticket: req.query.ticket,
                plate: ticketDecode.split("|")[1],
                parking_status_id: 1
            },
            select: {
                id: true,
                check_in: true,
                ticket: true,
                parking_status: {
                    select: {
                        name: true
                    }
                },
                vehicle: {
                    select: {
                        name: true
                    }
                },

            }
        })
        if (result === null) {
            res.status(500).json({
                result: result,
                message: "No Data Found"
            })
            return
        }
        result.check_out = timestampnow;
        result.duration = `${Math.floor((timestampnow - result.check_in) / 3600)} Hour ${Math.floor(Math.floor((timestampnow - result.check_in) % 3600) / 60)} Minute`
        result.price = Math.floor((timestampnow - result.check_in) / 3600) * 3000
        res.status(200).json({
            result: result,
            message: "Data Found"
        })
    } else if (req.method === "POST") {
        const timestampnow = Math.floor(Date.now() / 1000).toString();
        const result = await prisma.parking.update({
            where: {
                id: req.body.id,
            },
            data: {
                check_out: req.body.check_out,
                parking_status_id: 2
            }
        })
        if (result === null) {
            res.status(500).json({
                result: result,
                message: "No Data"
            })
            return
        }
        res.status(200).json({
            result: result,
            message: "success"
        })
    } else res.status(200).json({
        result: 'API next.js',
        message: "success"
    })
}
