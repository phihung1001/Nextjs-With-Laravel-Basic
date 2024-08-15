"use client"; // This is a client component 👈🏽
import Image from "next/image";
import Link from "next/link";
export default function Page() {
  return (
    <div className="w-screen py-20 flex justify-center flex-col items-center">

      <div className="flex items-center justify-between gap-1 mb-5">
        <h1 className="text-4xl font-bold"> Delete - Todo App</h1>
      </div>
    </div>
  );
}