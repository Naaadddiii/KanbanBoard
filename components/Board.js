"use client";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import CardItem from "./Card";
import BoardData from "../data/board-data.json";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function Board() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(result.source.droppableId)].items[
        result.source.index
      ];
    newBoardData[parseInt(result.source.droppableId)].items.splice(
      result.source.index,
      1
    );
    newBoardData[parseInt(result.destination.droppableId)].items.splice(
      result.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };
  return (
    <>
      {ready && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {BoardData.map((board, bIndex) => (
              <div key={bIndex} className="bg-white shadow-md rounded-md ">
                <Droppable droppableId={bIndex.toString()}>
                  {(provider) => (
                    <div {...provider.droppableProps} ref={provider.innerRef}>
                      <h4 className="flex justify-between items-center p-2">
                        <span className="uppercase text-xs font-semibold text-gray-600 tracking-[.25em]">
                          {board.name}
                        </span>
                      </h4>
                      <div>
                        {board.items.length > 0 &&
                          board.items.map((item, iIndex) => {
                            return (
                              <CardItem
                                index={iIndex}
                                key={item.id}
                                data={item}
                              />
                            );
                          })}
                        {provider.placeholder}
                      </div>

                      {showForm && selectedBoard === bIndex ? (
                        <div className="flex flex-col mx-2 mt-3 text-sm ">
                          <textarea
                            rows={3}
                            placeholder="Add Task"
                            onKeyPress={(e) => onTextAreaKeyPress}
                            data-id={bIndex}
                            onKeyDown={(e) => onTextAreaKeyPress(e)}
                            className="flex border border-gray-100 rounded-sm p-2 outline-none"
                          />
                          <p className="text-xs text-gray-500 mt-1 italic">
                            Press Enter to send the data
                          </p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="flex w-full justify-center items-center my-3 space-x-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition"
                          onClick={() => {
                            setSelectedBoard(bIndex);
                            setShowForm(true);
                          }}
                        >
                          <span>Add Task</span>
                        </button>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      )}
    </>
  );
}
export default Board;
