'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toggleFavorite } from '@/store/recipesSlice';
import { useState } from 'react';
import { RecipeModal } from './RecipeModal';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.recipes.favorites);
  const isFavorite = favorites.some(r => r.uri === recipe.uri);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div 
          className="relative h-48 w-full cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image 
            src={recipe.image} 
            alt={recipe.label}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 
              className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600"
              onClick={() => setShowModal(true)}
            >
              {recipe.label}
            </h3>
            <button
              onClick={() => dispatch(toggleFavorite(recipe))}
              className="text-red-500 hover:text-red-600 transition-colors"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {recipe.dietLabels.map(label => (
              <span key={label} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                {label}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            <p>Calories: {Math.round(recipe.calories)}</p>
            <p>Time: {recipe.totalTime > 0 ? `${recipe.totalTime} mins` : 'Not specified'}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <RecipeModal 
          recipe={recipe} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
}