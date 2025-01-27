import { NextRequest, NextResponse } from 'next/server';
import prisma from 'prisma/client';
import { z } from 'zod';

// Zod Schema for validation
const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  photoUrl: z.string(),
});

// GET all products
export async function GET() {
  try {
    const products = await prisma.products.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (err:any) {
    return NextResponse.json({ error: err.message  }, { status: 500 });
  }
}

// Create a product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const product = await prisma.products.create({ data });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// Update a product
export async function PUT(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    const data = productSchema.partial().parse(updates);

    const product = await prisma.products.update({
      where: { id },
      data,
    });
    return NextResponse.json(product, { status: 200 });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

// Delete a product
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.products.delete({ where: { id } });
    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
