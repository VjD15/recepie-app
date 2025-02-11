import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SearchBar } from './components/SearchBar';
import { Filters } from './components/Filters';
import { RecipeCard } from './components/RecipeCard';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import { CookingPot } from 'lucide-react';
import { fetchRecipes } from './store/recipesSlice';

const RecipeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, filters } = useAppSelector(state => state.recipes);

  useEffect(() => {
    // Fetch initial recipes when component mounts
    dispatch(fetchRecipes('pizza'));
  }, [dispatch]);

  const filteredRecipes = items.filter(recipe => {
    if (filters.mealType && !recipe.mealType.includes(filters.mealType)) return false;
    if (filters.dietType && !recipe.healthLabels.includes(filters.dietType)) return false;
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
};

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;