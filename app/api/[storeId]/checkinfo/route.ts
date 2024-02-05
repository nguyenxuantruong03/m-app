// // pages/api/checkout.js

// import { NextApiRequest, NextApiResponse } from 'next';
// import prismadb from "@/lib/prismadb";

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//     try {
//       const { gender, fullName, phoneNumber } = req.body;

//       // Save customer information to the database using Prisma
//       const customer = await prismadb.infocustomer.create({
//         data: {
//           gender,
//           fullName,
//           phoneNumber,
//         },
//       });

//       res.status(200).json({ success: true, customer });
//     } catch (error) {
//       console.error('Error saving customer information:', error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// }
