# Recipe App with Favorites and Filters

## Description

This project is a Recipe App built using NextJS and Redux. It allows users to browse and search for recipes, save their favorite recipes, and apply filters to find specific types of recipes. The app fetches recipe data from an external API and provides a user-friendly interface for managing and discovering recipes.

## Key Features

-   **Recipe Collection Display:** Displays a collection of recipes with titles, images, and brief descriptions[8].
-   **API Integration:** Fetches recipe data from an API to populate the recipe collection[8].
-   **Search Functionality:** Allows users to search for recipes based on keywords, ingredients, or specific criteria (e.g., vegetarian, gluten-free)[8].
-   **Detailed Recipe View:** Displays recipe details, including ingredients, instructions, preparation time, and serving size, when a recipe is selected[8].
-   **Favorites List:** Enables users to mark recipes as favorites and save them to a personal favorites list[8].
-   **Filtering Options:** Implements filtering options to allow users to filter recipes based on categories (e.g., breakfast, lunch, dinner) or dietary restrictions[8].
-   **State Management:** Utilizes NectJS and Redux for state management, with appropriate actions, reducers, and the store[8].

## Technologies Used

-   NextJS 
-   Redux
-   Tailwind CSS


## Setup Instructions

1.  Clone the repository:

    ```bash
    git clone [repository URL]
    cd [project directory]
    ```
2.  Install dependencies:

    -   If using React:

        ```bash
        npm install
        ```
   
3.  Start the application:

    -   For Next:

        ```bash
        npm start dev
        ```
  
   

4.  Open the application in your browser at `http://localhost:3000` (or the appropriate port for your setup).

## You can see the app here also 

https://recepie-app-one.vercel.app/

## Code Structure

The project is organized into reusable components, following best practices for code structure, readability, and maintainability[8]. Key components include:

-   **RecipeList:** Displays a list of recipes[1].
-   **RecipeItem:** Represents an individual recipe in the list[1].
-   **RecipeDetails:** Shows detailed information for a selected recipe[1].
-   **Search:** Allows users to search for recipes[1].
-   **Filters:** Provides options for filtering recipes[8].
-   **Favorites:** Manages the list of favorite recipes[6].

## Redux Implementation

Redux is used for state management, with the following key elements[3][5]:

-   **Actions:** Define the events that can occur in the application.
-   **Reducers:** Specify how the application's state changes in response to actions.
-   **Store:** Holds the complete state of the application.


## Additional Information

-   The application fetches recipe data from the [Edamam API](https://api.edamam.com/search?q=pizza&app_id=a5de3521aapp_key=28f8a20bd893e2740)[8].
-   Consider using Redux Toolkit to simplify Redux setup and management[5].
-   For Next applications, a Firebase backend can be used to allow users to create accounts and manage data[4].

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

