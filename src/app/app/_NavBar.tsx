'use client';

import Link from 'next/link';
import { BrainCircuit as BrainCircuitIcon, LogOut, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SignOutButton, useClerk } from '@clerk/nextjs';
import UserAvatar from '@/features/users/components/UserAvatar';

const NavBar = ({ user }: { user: any }) => {
  const { openUserProfile, signOut } = useClerk();

  const initials = user
    ? (user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '') ||
      user.username?.[0] ||
      '?'
    : '?';

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
