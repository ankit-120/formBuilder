import React, { useState } from "react";
import CategorizeQuestion from "./components/CategorizeQuestion";
import { createCategoryQuestion } from "./apis";
import axios from "axios";
import BlankFillingQuestion from "./components/BlankFillingQuestion";
import BlankFillingRender from "./components/BlankFillingRender";
import CategorizeRendering from "./components/CategorizeRendering";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const updateCategories = (categoriesData) => {
    setCategories(categoriesData);
  };
  const updateItems = (itemsData) => {
    setItems(itemsData);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        categories: categories,
        items: items,
      };

      const { data } = await axios.post(createCategoryQuestion(), formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* <CategorizeQuestion
        categories={categories}
        updateCategories={updateCategories}
        items={items}
        updateItems={updateItems}
      />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div> */}

      {/* <BlankFillingQuestion />
      <BlankFillingRender /> */}

      <CategorizeRendering />
    </div>
  );
};

export default App;
