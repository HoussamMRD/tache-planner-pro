
import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { Button } from "@/components/ui/button";

const TaskModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-center">Task Planner Modal Demo</h2>
        <p className="text-gray-500 text-center max-w-md">
          Click the button below to open the professional task planning modal with a teal-blue color scheme
        </p>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
        >
          Open Task Modal
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
            <TaskModal closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModalDemo;
