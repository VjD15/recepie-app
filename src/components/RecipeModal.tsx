import { X } from 'lucide-react';
import { Recipe } from '@/types/recipe';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{recipe.label}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={recipe.image}
                alt={recipe.label}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="mt-4 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Preparation Time:</span>
                  {recipe.totalTime > 0 ? `${recipe.totalTime} minutes` : 'Not specified'}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Servings:</span>
                  {recipe.yield} servings
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Calories:</span>
                  {Math.round(recipe.calories)} kcal
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-lg mb-2">Diet Labels</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.dietLabels.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {label}
                    </span>
                  ))}
                  {recipe.healthLabels.slice(0, 3).map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredientLines.map((ingredient, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  View full recipe instructions on {recipe.source}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}