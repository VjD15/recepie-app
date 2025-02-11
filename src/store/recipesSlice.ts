import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeSearchResponse } from '../types/recipe';

const APP_ID = 'd46712de';
const APP_KEY = 'a49bd9abcbbd276d741d4cfa5fbb3856';
const USER_ID = 'recipe-app';

const STORAGE_KEY = 'recipe-app-favorites';

interface RecipesState {
  items: Recipe[];
  favorites: Recipe[];
  loading: boolean;
  error: string | null;
  filters: {
    mealType: string;
    dietType: string;
  };
}

// Load favorites from localStorage
const loadFavorites = (): Recipe[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

const initialState: RecipesState = {
  items: [],
  favorites: loadFavorites(),
  loading: false,
  error: null,
  filters: {
    mealType: '',
    dietType: '',
  },
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string = 'pizza') => {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=50`,
        {
          headers: {
            'Accept': 'application/json',
            'Edamam-Account-User': USER_ID
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch recipes');
      }

      const data: RecipeSearchResponse = await response.json();
      return data.hits.map(hit => hit.recipe);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Recipe>) => {
      const recipe = action.payload;
      const index = state.favorites.findIndex(r => r.uri === recipe.uri);
      if (index === -1) {
        state.favorites.push(recipe);
      } else {
        state.favorites.splice(index, 1);
      }
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
      }
    },
    setFilters: (state, action: PayloadAction<{ mealType: string; dietType: string }>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export const { toggleFavorite, setFilters } = recipesSlice.actions;
export default recipesSlice.reducer;