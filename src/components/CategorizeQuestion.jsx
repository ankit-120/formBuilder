import axios from "axios";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlineClose } from "react-icons/ai";

const CategorizeQuestion = ({
  categories,
  updateCategories,
  items,
  updateItems,
}) => {
  const [category, setCategory] = useState("");
  // const [categories, setCategories] = useState([]);

  const [item, setItem] = useState("");
  // const [items, setItems] = useState([]);

  const addCategory = () => {
    let temp = [...categories];
    temp.push(category);
    updateCategories(temp);
    setCategory("");
  };

  const addItem = () => {
    let temp = [...items];
    temp.push({ item, belongTo: "" });
    // setItems(temp);
    updateItems(temp);
    setItem("");
  };

  const addBelongTo = (event, selectedItem) => {
    console.log(event.target.value, selectedItem);
    let temp = [...items];
    const updatedTemp = temp.map((i) =>
      i.item === selectedItem ? { ...i, belongTo: event.target.value } : i
    );
    updateItems(updatedTemp);
  };

  const removeCategory = (e, index) => {
    const temp = [...categories];
    console.log(index);
    temp.splice(index, 1);
    updateCategories(temp);
  };

  const removeItem = (e, index) => {
    const temp = [...items];
    temp.splice(index, 1);
    updateItems(temp);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const tempCategories = [...categories];
    const [removedItem] = tempCategories.splice(result.source.index, 1);
    tempCategories.splice(result.destination.index, 0, removedItem);
    updateCategories(tempCategories);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mx-28 p-4">
        <h1 className="mb-4 text-2xl font-bold">Question 1</h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Description (optional)"
          />
        </div>

        <div className="mb-4">
          {/* adding category button  */}
          <div className="mb-2 text-lg font-bold">Categories</div>
          <div className="flex">
            <input
              type="text"
              className="w-2/3 rounded border border-gray-300 p-2"
              placeholder="Add category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className="ml-2 w-1/3 rounded bg-blue-500 p-2 text-white"
              onClick={addCategory}
            >
              Add Category
            </button>
          </div>

          {/* listing added categories  */}
          <Droppable droppableId="question1">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-4 space-y-2"
              >
                {categories.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex w-40 min-w-fit cursor-pointer items-center justify-between rounded border border-gray-300 p-2"
                      >
                        {item}
                        {/* button to remove the category  */}
                        <button
                          onClick={(e) => removeCategory(e, index)}
                          className="text-red-700"
                        >
                          <AiOutlineClose />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="mb-4">
          {/* button to add items  */}
          <div className="mb-2 text-lg font-bold">Items</div>
          <div className="flex">
            <input
              type="text"
              className="w-2/3 rounded border border-gray-300 p-2"
              placeholder="Add item"
              name="item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <button
              className="ml-2 w-1/3 rounded bg-blue-500 p-2 text-white"
              onClick={addItem}
            >
              Add Item
            </button>
          </div>

          {/* listing items  */}
          {items.length !== 0 && (
            <Droppable droppableId="items">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mt-4"
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={item.item}
                      draggableId={item.item}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          className="my-2 flex w-96  min-w-fit cursor-pointer items-center justify-between rounded border border-gray-300 p-2"
                        >
                          <div>{item.item}</div>
                          <div>
                            <select
                              value={item.belongTo}
                              onChange={(e) => addBelongTo(e, item.item)}
                              className="rounded border border-gray-300 p-2"
                            >
                              <option value={""}>Select category</option>
                              {categories.map((category, index) => (
                                <option key={index} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                            {/* button to remove item  */}
                            <button
                              onClick={(e) => removeItem(e, index)}
                              className="ml-2 text-red-700"
                            >
                              <AiOutlineClose />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default CategorizeQuestion;
