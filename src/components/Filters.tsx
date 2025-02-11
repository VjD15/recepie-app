import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setFilters } from '../store/recipesSlice';

// These match the actual values from the Edamam API
const MEAL_TYPES = [
  { value: 'breakfast', label: 'Breakfast' },
 
  { value: 'lunch/dinner', label: 'Lunch/Dinner' },


];

const DIET_TYPES = [
  { value: 'balanced', label: 'Balanced' },
 
  { value: 'low-fat', label: 'Low-Fat' },
  { value: 'low-carb', label: 'Low-Carb' },

  { value: 'vegetarian', label: 'Vegetarian' },

];

export const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.recipes.filters);

  const handleFilterChange = (type: 'mealType' | 'dietType', value: string) => {
    dispatch(setFilters({ ...filters, [type]: value }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Meal Type
        </label>
        <select
          value={filters.mealType}
          onChange={(e) => handleFilterChange('mealType', e.target.value)}
          className="block w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Meals</option>
          {MEAL_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diet Type
        </label>
        <select
          value={filters.dietType}
          onChange={(e) => handleFilterChange('dietType', e.target.value)}
          className="block w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Diets</option>
          {DIET_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};