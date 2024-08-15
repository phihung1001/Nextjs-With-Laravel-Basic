<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // get-all cong viec
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }
    public function gettask($id)
    {
        try {
            $tasks = Task::findOrFail($id);
            return response()->json($tasks);
        } catch(ModelNotFoundException $e) {
            return response()->json([
                'message' => 'not task',
            ],404);
        }
    }

    // create cong viaec
    public function create(Request $request) {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
        ]);
        $task = Task::create($request->all());
        return response()->json($task, 201);
    }
    // Update cong viec
    public function update($id, Request $request) {
        try{
            $task = Task::findOrFail($id);
            $task->update($request->all());
            return response()->json($task, 200);
        } catch(ModelNotFoundException) {
            return response()->json([
                'message' => 'not task',
            ],404);
        }
    }

    //Delete cong viec
    public function delete($id) {
        try{
            $task = Task::findOrFail($id);
            $task->delete();
            return response()->json(['message' => 'Task deleted successfully']);
        } catch(ModelNotFoundException) {
                return response()->json([  'message' => 'not task',],404);
        }

    }
}
