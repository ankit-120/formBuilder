import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const BlankFillingQuestion = () => {
    const [underlinedTextArray, setUnderlinedTextArray] = useState([]);
    const [preview, setPreview] = useState("");
    const [solution, setSolution] = useState([]);

    const handleEditorChange = (content) => {
        // console.log(content);
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        // console.log(doc.body.textContent);

        //for options
        // Find all <span> elements with text-decoration: underline;
        const underlinedSpans = doc.querySelectorAll(
            'span[style*="text-decoration: underline;"]'
        );
        // Extract and store the text from the underlined spans in an array
        const extractedText = Array.from(underlinedSpans).map(
            (span) => span.textContent
        );
        setSolution(extractedText);
        // console.log(extractedText);

        //for preview
        const underlinedSpans2 = doc.querySelectorAll(
            'span[style*="text-decoration: underline;"]'
        );
        underlinedSpans2.forEach((span) => {
            span.textContent = "_".repeat(span.textContent.length);
        });
        const textContent = doc.body.textContent;
        setPreview(textContent);

        setUnderlinedTextArray(extractedText);
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const temp = [...underlinedTextArray];
        const [removedItem] = temp.splice(result.source.index, 1);
        temp.splice(result.destination.index, 0, removedItem);
        setUnderlinedTextArray(temp);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-4 text-2xl font-semibold">
                Blank Filling Question
            </h1>

            {preview != "" && (
                <div className="mb-4">
                    <div className="text-lg font-semibold">Preview</div>
                    <div className="rounded-lg bg-white p-4 shadow">
                        {preview}
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <div className="w-1/2">
                    <div className="text-lg font-semibold">Sentence</div>
                    <Editor
                        apiKey="8uyw97bgzg7gmit9yafpquh25peys2ess4jy5wy3iyre5z9w"
                        initialValue="<p>Underline the word here to convert them to blanks</p>"
                        init={{
                            height: 130,
                            width: 500,
                            menubar: false,
                            toolbar: "underline",
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="w-1/2 pl-4">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="mb-4">
                            <div className="text-lg font-semibold">Options</div>
                        </div>
                        <Droppable droppableId="question2">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="rounded-lg bg-gray-100 p-4"
                                >
                                    {underlinedTextArray.map((text, index) => (
                                        <Draggable
                                            key={text}
                                            draggableId={text}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    className="mb-2 rounded-lg bg-white p-2 shadow"
                                                >
                                                    {text}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default BlankFillingQuestion;
