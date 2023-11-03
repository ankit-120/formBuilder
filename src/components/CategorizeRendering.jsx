import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const CategorizeRendering = () => {
  const [options, setOptions] = useState(["item 1", "item 2", "item 3"]);
  const categories = ["cat 1", "cat 2"];
  const [answers, setAnswers] = useState([[], []]);

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    if (destination == null) return;

    if (source.droppableId === "option" && !isNaN(destination.droppableId)) {
      const tempAnswers = [...answers];
      tempAnswers[+destination.droppableId].push(options[source.index]);
      const tempOptions = [...options];
      tempOptions.splice(source.index, 1);
      setAnswers(tempAnswers);
      setOptions(tempOptions);
    }
  };

  return (
    <>
      <div>
        <div className="mb-2 text-lg font-bold">Question 1</div>
        <div className="flex flex-col items-center bg-yellow-200 p-10">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="option">
              {(provided) => (
                <div
                  className="flex bg-pink-400"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {options.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided) => (
                        <div
                          className="m-2 rounded-md border-2 border-black px-5 py-2"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {item}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="flex">
              {categories.map((item, index) => (
                <div key={index}>
                  <div className="mx-4 my-2 flex w-40 justify-center rounded-md bg-purple-400 py-2">
                    {item}
                  </div>
                  <Droppable droppableId={`${index}`}>
                    {(provided) => (
                      <div
                        className="mx-4 h-fit min-h-[100px] w-40 rounded-md bg-purple-400 p-5"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {answers.length != 0 &&
                          answers[index].map((item, index) => (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="flex flex-col items-center"
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                >
                                  {item}
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default CategorizeRendering;
