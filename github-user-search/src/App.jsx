import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// src/App.jsx
import React from "react";
import Search from "./components/Search";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold">GitHub User Search</h1>
        </div>
      </header>

      <main className="py-8">
        <Search />
      </main>
    </div>
  );
}


