const { PrismaClient } = require('@prisma/client')

const vehicles =[
    {name:"Car"},
    {name:"Motorcycle"}
]
const parkingStatus =[
    {name:"Parking"},
    {name:"Pay"}
]
const prisma = new PrismaClient();
async function main(){
    for(let vehicle of vehicles){
        await prisma.Vehicle.create({
            data:vehicle
        })
    }
    for(let status of parkingStatus){
        await prisma.ParkingStatus.create({
            data:status
        })
    }
}

main()
.catch(e=>{
    console.log(e);
    process.exit(1);
})
.finally(()=>{
    prisma.$disconnect();
})