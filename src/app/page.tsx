'use client';

import { CookingPot } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { Filters } from '@/components/Filters';
import { RecipeList } from '@/components/RecipeList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <CookingPot className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Recipe Finder</h1>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar />
        </div>
        <Filters />
        <RecipeList />
      </main>
    </div>
  );
}