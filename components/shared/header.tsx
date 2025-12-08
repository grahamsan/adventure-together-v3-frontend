"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UsersNavValues } from '@/utils/users-nav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CreateEventForm from '../users-side/forms/create-event-form';
import CreateTripForm from '../users-side/forms/create-trip-form';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const headerLayoutClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-10";

  // Fonction pour gérer la navigation
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${headerLayoutClasses}`}>
        <div className="flex justify-between items-center w-full 
        backdrop-blur-sm bg-white/90 rounded-[18px] p-2 lg:w-[70vw] mx-auto shadow-sm">
          
          <div>
            <span className="text-[18px] font-bold text-[[var(--BRAND-500)]]">AdventureTogether</span>
          </div>

          <nav className="hidden lg:flex items-center gap-x-1">
            <ul className="flex gap-x-2">
              {UsersNavValues.map((item, index) => {
                const isActive = pathname === item.path;
                
                return (
                  <li key={index}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        flex items-center gap-x-2 px-4 py-2 rounded-full
                        transition-all duration-300 ease-in-out border-none 
                        hover:text-stone-800
                        ${isActive ? 'text-white font-semibold' : 'text-stone-600'}
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm">{item.name}</span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          {/* Actions Desktop + Avatar */}
          <div className='flex gap-x-2 items-center'>
            <div className='hidden lg:flex gap-x-2'>
              <CreateEventForm />
              <CreateTripForm />
            </div>
            <Avatar className='w-12 h-12'>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Mobile - Visible uniquement sur mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
        <div className="max-w-full px-4">
          <ul className="flex justify-around items-center h-16">
            {UsersNavValues.map((item, index) => {
              const isActive = pathname === item.path;
              
              return (
                <li key={index} className="flex-1">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex flex-col items-center justify-center gap-1 py-2
                      transition-all duration-300 ease-in-out
                      ${isActive ? 'text-[[var(--BRAND-500)]]' : 'text-gray-500'}
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={`
                      transition-all duration-300
                      ${isActive ? 'scale-110' : 'scale-100'}
                    `}>
                      {item.icon}
                    </span>
                    {/* Optionnel: petit dot indicateur au lieu du label */}
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[[var(--BRAND-500)]]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Spacer pour éviter que le contenu soit caché sous le bottom nav sur mobile */}
      <div className="lg:hidden h-16" />
    </>
  );
}
