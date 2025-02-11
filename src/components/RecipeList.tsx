'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchRecipes } from '@/store/recipesSlice';
import { RecipeCard } from './RecipeCard';

export function RecipeList() {
  const dispatch = useAppDispatch();
  const { items, loading, error, filters } = useAppSelector(state => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes('pizza'));
  }, [dispatch]);

  const filteredRecipes = items.filter(recipe => {
    // Check meal type (case-insensitive)
    if (filters.mealType && !recipe.mealType.some(type => 
      type.toLowerCase() === filters.mealType.toLowerCase()
    )) {
      return false;
    }
    
    // Check diet type against both dietLabels and healthLabels (case-insensitive)
    if (filters.dietType) {
      const dietType = filters.dietType.toLowerCase();
      const hasMatchingDiet = recipe.dietLabels.some(label => 
        label.toLowerCase() === dietType
      ) || recipe.healthLabels.some(label => 
        label.toLowerCase() === dietType
      );
      
      if (!hasMatchingDiet) {
        return false;
      }
    }
    
    return true;
  });

  if (loading && items.length === 0) return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading recipes...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
      <p className="font-semibold">Error loading recipes</p>
      <p className="text-sm">{error}</p>
    </div>
  );

  if (filteredRecipes.length === 0) return (
    <div className="text-center text-gray-600 p-8">
      <p className="text-lg">No recipes found matching your filters.</p>
      <p className="text-sm mt-2">Try adjusting your search criteria or filters.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map(recipe => (
        <RecipeCard key={recipe.uri} recipe={recipe} />
      ))}
    </div>
  );
}