import prisma from "@/lib/db";
import { addTask } from "app/actions/actions";

export default async function LoginForm() {

  const task = await prisma.task.findMany();
  
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-slate-400 w-96 rounded-lg h-44">
        <h1 className="text-4xl font-bold text-white">Tasks</h1>

        <form action={addTask} className="gap-x-1 h-4 flex flex-col items-center justify-center mt-5" >
          <input type="text" name="name" placeholder="Write your task" className="bg-white text-black rounded-lg text-center"/>
          <button type="submit" className="bg-blue-500 text-white rounded-lg w-24 mt-1">Add</button>

        </form>

      </div>
    </main>
  );
}