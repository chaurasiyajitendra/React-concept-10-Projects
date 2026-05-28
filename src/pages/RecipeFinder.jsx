import { useMemo, useState } from "react";
import { Search, Clock3, ChefHat, UtensilsCrossed } from "lucide-react";
import { italianDishes as recipes } from "../utils/recipe";

const RecipeFinder = () => {
  const [search, setSearch] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState(recipes[0]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold mb-2">Recipe Finder</h1>

          <p className="text-slate-400 text-lg">
            Explore delicious Italian dishes 🍝
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-[360px_1fr] gap-6 flex-1 overflow-hidden">
          {/* LEFT SIDE */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 overflow-hidden flex flex-col">
            {/* Search */}
            <div className="relative mb-5">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search recipe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-white"
              />
            </div>

            {/* Recipe List */}
            <div
              className="
                flex-1
                overflow-y-auto
                pr-2
                flex
                flex-col
                gap-4
                scroll-smooth
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`
                    border rounded-3xl p-4 cursor-pointer transition-all
                    ${
                      selectedRecipe.id === recipe.id
                        ? "bg-white text-black border-white"
                        : "bg-slate-800 border-slate-700 hover:border-slate-500"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{recipe.emoji}</div>

                    <div>
                      <h2 className="text-lg font-semibold">{recipe.name}</h2>

                      <p
                        className={`text-sm ${
                          selectedRecipe.id === recipe.id
                            ? "text-slate-700"
                            : "text-slate-400"
                        }`}
                      >
                        {recipe.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className="
    bg-slate-900 border border-slate-800 rounded-3xl p-8
    overflow-y-auto
    scroll-smooth
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
  "
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-8 gap-6">
              <div className="flex-1">
                {/* Title */}
                <div className="flex items-center gap-5 mb-5">
                  {/* Emoji Box */}
                  <div
                    style={{
                      backgroundColor: `${selectedRecipe.color}20`,
                      border: `1px solid ${selectedRecipe.color}`,
                    }}
                    className="w-28 h-28 rounded-3xl flex items-center justify-center text-6xl shadow-lg"
                  >
                    {selectedRecipe.emoji}
                  </div>

                  {/* Heading */}
                  <div>
                    <h1 className="text-5xl font-bold mb-2">
                      {selectedRecipe.name}
                    </h1>

                    <p
                      className="text-xl font-medium"
                      style={{ color: selectedRecipe.color }}
                    >
                      {selectedRecipe.italian}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed text-lg max-w-4xl">
                  {selectedRecipe.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {selectedRecipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: `${selectedRecipe.color}15`,
                        border: `1px solid ${selectedRecipe.color}40`,
                        color: selectedRecipe.color,
                      }}
                      className="px-4 py-2 rounded-full text-sm font-medium capitalize"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-5 mb-10">
              {/* Time */}
              <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700">
                <Clock3
                  size={30}
                  className="mb-4"
                  style={{ color: selectedRecipe.color }}
                />

                <p className="text-slate-400 mb-2">Cooking Time</p>

                <h2 className="text-2xl font-bold">{selectedRecipe.time}</h2>
              </div>

              {/* Difficulty */}
              <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700">
                <ChefHat
                  size={30}
                  className="mb-4"
                  style={{ color: selectedRecipe.color }}
                />

                <p className="text-slate-400 mb-2">Difficulty</p>

                <h2 className="text-2xl font-bold">
                  {selectedRecipe.difficulty}
                </h2>
              </div>

              {/* Category */}
              <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700">
                <UtensilsCrossed
                  size={30}
                  className="mb-4"
                  style={{ color: selectedRecipe.color }}
                />

                <p className="text-slate-400 mb-2">Category</p>

                <h2 className="text-2xl font-bold">
                  {selectedRecipe.category}
                </h2>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-5">Ingredients</h2>

              <div className="grid grid-cols-2 gap-4">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    style={{
                      borderColor: `${selectedRecipe.color}30`,
                    }}
                    className="bg-slate-800 border rounded-2xl px-4 py-4 flex items-center gap-3"
                  >
                    <div
                      style={{
                        backgroundColor: selectedRecipe.color,
                      }}
                      className="w-3 h-3 rounded-full"
                    />

                    <p>{ingredient}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-3xl font-bold mb-5">Cooking Steps</h2>

              <div className="flex flex-col gap-4">
                {selectedRecipe.steps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      borderColor: `${selectedRecipe.color}30`,
                    }}
                    className="flex gap-5 bg-slate-800 border rounded-2xl p-5"
                  >
                    <div
                      style={{
                        backgroundColor: selectedRecipe.color,
                      }}
                      className="w-11 h-11 rounded-full text-black flex items-center justify-center font-bold shrink-0"
                    >
                      {index + 1}
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFinder;
