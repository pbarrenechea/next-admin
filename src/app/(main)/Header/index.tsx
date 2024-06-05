'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import Profile from '@/app/(main)/Header/ProfileDropdown';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className="sticky top-0 lg:ml-[240px] z-50">
      <div className="appHeader">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center md:space-x-4 space-x-2 "></div>
          <div className="nav-tools flex items-center lg:space-x-6 space-x-3">
            <div className="relative inline-block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
