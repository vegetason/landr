'use client';

import Link from 'next/link';
import {
  BookOpenIcon,
  BrainCircuit as BrainCircuitIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutButton, useClerk } from '@clerk/nextjs';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const navlinks = [
  { name: 'Interviews', href: '/interviews', Icon: SpeechIcon },
  { name: 'Questions', href: '/questions', Icon: BookOpenIcon },
  { name: 'Resume', href: '/resume', Icon: FileSlidersIcon },
];

const NavBar = ({ user }: { user: {
    id: string;
    name: string;
    email: string;
    username: string | null;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
} | undefined}) => {
  const { openUserProfile } = useClerk();

  const { jobInfoId } = useParams();
  const pathname = usePathname();

  return (
    <nav className="h-header border-b">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <BrainCircuitIcon
            className="size-8 text-primary"
            aria-hidden="true"
          />
          <Link href="/" className="font-bold text-xl">
            Landr
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {typeof jobInfoId === 'string' &&
            navlinks.map(({ name, href, Icon }) => {
              const hrefPath = `/app/job-infos/${jobInfoId}/${href}`;
              return (
                <Button
                  variant={pathname == hrefPath ? 'secondary' : 'ghost'}
                  key={name}
                  asChild
                  className="cursor-pointer max-sm:hidden"
                >
                  <Link href={hrefPath}>
                    <Icon />
                    {name}
                  </Link>
                </Button>
              );
            })}
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Open user menu"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <UserAvatar user={user} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openUserProfile()}>
                <User className="mr-2" />
                Profile
              </DropdownMenuItem>
              <SignOutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2" />
                  Logout
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
