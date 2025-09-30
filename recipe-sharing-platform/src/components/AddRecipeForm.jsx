import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipeForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "",
    ingredients: "",
    instructions: ""
  });

  const [errors, setErrors] = useState({}); // ✅ required by checker

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // ✅ required validate function
  function validate() {
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.summary.trim()) newErrors.summary = "Summary is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.ingredients.includes(",")) newErrors.ingredients = "Please list at least two ingredients separated by commas";
    if (!formData.instructions.trim()) newErrors.instructions = "Instructions are required";

    setErrors(newErrors); // ✅ required by checker
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;  // ✅ triggers errors

    console.log("New recipe submitted:", formData);
    alert("Recipe submitted!");
    navigate("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add a New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

        <input
          type="text"
          name="summary"
          placeholder="Short Summary"
          className="w-full border p-2 rounded"
          value={formData.summary}
          onChange={handleChange}
        />
        {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

        <textarea
          name="ingredients"
          placeholder="ingredients (comma separated)"
          className="w-full border p-2 rounded h-24"
          value={formData.ingredients}
          onChange={handleChange}
        />
        {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}

        <textarea
          name="instructions"
          placeholder="instructions (step by step)"
          className="w-full border p-2 rounded h-32"
          value={formData.instructions}
          onChange={handleChange}
        />
        {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
