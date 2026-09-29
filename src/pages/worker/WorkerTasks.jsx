import React, { useState } from 'react';
import { useWorker } from '../../context/WorkerContext';
import { CheckCircle, Clock, AlertTriangle, X, Paperclip, Send, Check, Camera } from 'lucide-react';

const WorkerTasks = () => {
  const { tasks, markTaskComplete, updateTaskStatus } = useWorker();
  const [selectedTask, setSelectedTask] = useState(null);

  const pendingTasks = tasks.filter(t => t.status !== 'Completed');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  const handleTaskAction = (taskId, action) => {
    if (action === 'Complete') {
      markTaskComplete(taskId);
    } else {
      updateTaskStatus(taskId, action);
    }
    setSelectedTask(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f4c81]">My Tasks</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your assigned work and report progress.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex text-sm font-medium">
          <button className="px-6 py-3 text-[#0f4c81] border-b-2 border-[#0f4c81] bg-blue-50/50">
            Pending ({pendingTasks.length})
          </button>
          <button className="px-6 py-3 text-slate-500 hover:text-slate-700 hover:bg-slate-50">
            Completed ({completedTasks.length})
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {pendingTasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => setSelectedTask(task)}
              className="p-5 hover:bg-slate-50 cursor-pointer transition-colors flex justify-between items-start"
            >
              <div className="flex gap-4">
                <div className="mt-1">
                  {task.priority === 'High' ? <AlertTriangle className="w-5 h-5 text-red-500" /> :
                   task.priority === 'Medium' ? <Clock className="w-5 h-5 text-amber-500" /> :
                   <CheckCircle className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{task.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{task.id}</span>
                    <span>Assigned by {task.assignedBy}</span>
                    <span className={`font-semibold ${
                      task.due === new Date().toISOString().split('T')[0] ? 'text-red-600' : ''
                    }`}>Due: {task.due}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
          {pendingTasks.length === 0 && (
            <div className="p-8 text-center text-slate-500">No pending tasks. Great job!</div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">{selectedTask.id}</span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  selectedTask.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>{selectedTask.priority} Priority</span>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{selectedTask.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Assigned By</p>
                  <p className="font-semibold text-slate-800">{selectedTask.assignedBy}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Due Date</p>
                  <p className="font-semibold text-slate-800">{selectedTask.due}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Description</h3>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap">
                  {selectedTask.desc}
                </p>
              </div>

              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-800 mb-2">Attachments</h3>
                  <div className="flex gap-2">
                    {selectedTask.attachments.map((att, i) => (
                      <div key={i} className="flex items-center gap-2 bg-blue-50 text-[#0f4c81] border border-blue-100 px-3 py-2 rounded-lg text-sm font-medium">
                        <Paperclip className="w-4 h-4" /> {att}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-sm text-slate-500 font-medium">
                Current Status: <strong className="text-slate-800">{selectedTask.status}</strong>
              </span>
              <div className="flex flex-wrap gap-3 items-center">
                <label className="cursor-pointer px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Upload Photo
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                {selectedTask.status === 'Pending' && (
                  <button 
                    onClick={() => handleTaskAction(selectedTask.id, 'In Progress')}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50"
                  >
                    Start Work
                  </button>
                )}
                <button 
                  onClick={() => handleTaskAction(selectedTask.id, 'Complete')}
                  className="px-5 py-2 bg-[#136c4b] hover:bg-[#0e5239] text-white rounded-lg font-bold text-sm shadow-sm flex items-center"
                >
                  <Check className="w-4 h-4 mr-2 stroke-[3]" /> Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerTasks;
