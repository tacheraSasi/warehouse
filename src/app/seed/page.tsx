'use client';
import prisma from 'prisma/client';
import main from 'prisma/seed';
import { useState } from 'react';

export default function SeedPage() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const seed = async () => {
    main()
      .catch((e) => {
        console.error(e);
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
    setIsClicked(true);
  };
  return (
    <div>
      <button onClick={() => seed()} className='m-8 bg-slate-400 p-3 text-2xl'>
        {isClicked ? 'Clicked' : 'SEED'}
      </button>
    </div>
  );
}
