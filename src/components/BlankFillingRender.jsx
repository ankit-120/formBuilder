import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const BlankFillingRender = () => {
  const sent = "Quick _____ fox _____ over _____";
  const sentArr = sent.split(" ");
  const [options, setOptions] = useState(["brown", "jumps", "fence"]);

  const [sol, setSol] = useState([[], [], [], [], [], []]);

  const onDragEnd = (result) => {
    console.log(result);
    const { source, destination } = result;
    // base case
    if (destination == null) return;

    //filling the blanks by draging the options
    if (source.droppableId === "option" && !isNaN(destination.droppableId)) {
      const tempSolution = [...sol];
      const tempOptions = [...options];
      if (sol[+destination.droppableId].length < 1) {
        tempSolution[+destination.droppableId].push(tempOptions[source.index]);
        tempOptions.splice(source.index, 1);
      } else {
        const [removedSol] = tempSolution[+destination.droppableId].splice(
          0,
          1
        );
        tempSolution[+destination.droppableId].push(tempOptions[source.index]);
        tempOptions.splice(source.index, 1);
        tempOptions.push(removedSol);
      }
      setOptions(tempOptions);
      setSol(tempSolution);
    }

    //switching the solutions
    if (source.droppableId != "option" && destination.droppableId != "option") {
      const tempSolution = [...sol];
      const [removedSol] = tempSolution[+source.droppableId].splice(0, 1);
      tempSolution[+source.droppableId].push(
        tempSolution[+destination.droppableId][0]
      );
      tempSolution[+destination.droppableId].splice(0, 1, removedSol);
      setSol(tempSolution);
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className=" rounded-md bg-slate-100">
          <div className="m-4 text-lg font-bold">Question 2</div>
          {/* options  */}
          <Droppable droppableId="option">
            {(provided) => (
              <div
                className="flex bg-slate-100 p-10"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {options.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        className="mx-2 rounded-md bg-purple-400 px-5 py-2 text-white"
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

          {/* question  */}
          <div className="flex h-20 items-center bg-slate-100 p-10">
            {sentArr.map((item, index) => (
              <span key={index}>
                {item.charAt(0) != "_" ? (
                  item
                ) : (
                  <Droppable droppableId={`${index}`}>
                    {(provided) => (
                      <div
                        className={`${
                          sol[index].length === 0
                            ? "m-1 flex h-10 w-32 items-center justify-center rounded-md bg-gray-400"
                            : ""
                        }`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {sol[index].length != 0 &&
                          sol[index].map((item, index) => (
                            <Draggable
                              key={item}
                              draggableId={item}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="m-1 rounded-md bg-purple-400 px-5 py-2 text-white"
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
                )}
              </span>
            ))}
          </div>
        </div>
      </DragDropContext>
    </>
  );
};

export default BlankFillingRender;
