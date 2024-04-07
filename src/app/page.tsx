"use client";

import Image from "next/image";
import styles from "./page.module.css";
import IconAddTaskMobile from "@/assets/icon-add-task-mobile.svg";
import { useState, useRef, useEffect } from "react";
import CardsList from "@/app/_components/CardsList/CardsList";

// import IconAddTaskMobile from "../../../assets/icon-add-task-mobile.svg";

type Column = {
  id: string;
  title: string;
};

type Card = {
  id: string;
  columnId: string;
  title: string;
  description: string;
};

export default function Home() {
  const [addingColumn, setAddingColumn] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (addingColumn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [addingColumn, inputRef.current]);

  const handleDrop = (e: any) => {
    console.log("Dropped");
    // e.preventDefault();
    // const cardId = e.dataTransfer.getData("cardId");
    // const card = cards.find((card) => card.id === cardId);
    // if (card) {
    //   setCards(cards.map((c) => (c.id === cardId ? { ...c, columnId } : c)));
    // }
  };

  return (
    <main
      className={styles.main}
      onDragStart={(e) => {
        console.log("Drag start");

        const target = e.target as HTMLDivElement;
        const cardId = target.dataset.cardId;
        if (cardId) {
          e.dataTransfer.setData("cardId", cardId);
        }
      }}
    >
      <div className="min-h-[75svh] flex gap-2 overflow-x-auto ">
        {columns.map((column) => {
          return (
            <div
              key={column.id}
              className="flex flex-col gap-3 w-[343px] shrink-0 bg-gray-100 rounded-md p-2"
            >
              <h2 className="heading-m text-gray-500 mb-2">{column.title}</h2>
              <CardsList
                columnId={column.id}
                cards={cards}
                setCards={setCards}
              />
              {/* <button className="bg-gray-200 p-4 rounded-xl w-full  text-gray-500">
                Add card
              </button> */}
            </div>
          );

          // <div key={column.id} className="bg-gray-100 p-4 rounded-xl">
          //   <h2 className="heading-m">{column.title}</h2>
          // </div>
        })}
        <div className="w-[343px] shrink-0 bg-gray-100 rounded-md p-2">
          {!addingColumn ? (
            <button
              className="flex items-center justify-center gap-2 bg-indigo-500 px-4 py-3 text-white font-bold rounded-3xl hover:bg-indigo-400 w-full"
              onClick={() => {
                setAddingColumn(true);
              }}
            >
              <Image src={IconAddTaskMobile} alt="Add task" />
              Add New Column
            </button>
          ) : (
            <div className="flex flex-col gap-2 p-1">
              <input
                className="border p-2  rounded border-gray-400 w-full  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                type="text"
                placeholder="Column name"
                ref={inputRef}
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setColumns([
                      ...columns,
                      {
                        id: Math.random().toString(36).substr(2, 9),
                        title: newTaskTitle,
                      },
                    ]);
                    setAddingColumn(false);
                    setNewTaskTitle("");
                  }
                }}
              />
              <div className="flex justify-between ">
                <button
                  className="flex items-center justify-center gap-2 bg-gray-200 px-3 py-2 text-gray-500 font-bold rounded-3xl hover:bg-gray-300 min-w-24"
                  onClick={() => {
                    setAddingColumn(false);
                    setNewTaskTitle("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="flex items-center justify-center gap-2 bg-indigo-500 px-3 py-2 text-white font-bold rounded-3xl hover:bg-indigo-400  min-w-24"
                  onClick={() => {
                    setColumns([
                      ...columns,
                      {
                        id: Math.random().toString(36).substr(2, 9),
                        title: newTaskTitle,
                      },
                    ]);
                    setAddingColumn(false);
                    setNewTaskTitle("");
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
