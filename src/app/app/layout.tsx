import { getCurrentUser } from '@/services/clerk/lib/getCurrentUser';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import NavBar from './_NavBar';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (userId === null) return redirect('/');
  if (user === null) return redirect('/onboarding');
  return (
    <>
      <NavBar user={user} />
      {children}
    </>
  );
}
