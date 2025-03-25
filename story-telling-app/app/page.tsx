"use client";

import { useState } from "react";
import { useChat } from "ai/react";

// Define the character type
interface Character {
  id: number;
  name: string;
  description: string;
  personality: string;
}

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  
  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];
  
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  // State for characters with explicit typing
  const [characters, setCharacters] = useState<Character[]>([]);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    personality: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Type the event parameter
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  // Type the event parameter
  const handleCharacterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCharacter({
      ...newCharacter,
      [name]: value,
    });
  };

  const addCharacter = () => {
    if (newCharacter.name && newCharacter.description && newCharacter.personality) {
      setCharacters([...characters, { id: Date.now(), ...newCharacter }]);
      setNewCharacter({ name: "", description: "", personality: "" });
    }
  };

  const deleteCharacter = (id: number) => {
    setCharacters(characters.filter(character => character.id !== id));
  };

  const startEditing = (character: Character) => {
    setEditingId(character.id);
    setNewCharacter({
      name: character.name,
      description: character.description,
      personality: character.personality,
    });
  };

  const saveEdit = () => {
    setCharacters(characters.map(character =>
      character.id === editingId 
        ? { ...character, ...newCharacter }
        : character
    ));
    setEditingId(null);
    setNewCharacter({ name: "", description: "", personality: "" });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre, tone, and characters.
            </p>
          </div>

          {/* Character Management Section */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4 w-full">
            <h3 className="text-xl font-semibold">Characters</h3>
            
            {/* Character Input Form */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                name="name"
                value={newCharacter.name}
                onChange={handleCharacterChange}
                placeholder="Character Name"
                className="p-2 text-black rounded"
              />
              <input
                type="text"
                name="description"
                value={newCharacter.description}
                onChange={handleCharacterChange}
                placeholder="Description"
                className="p-2 text-black rounded"
              />
              <input
                type="text"
                name="personality"
                value={newCharacter.personality}
                onChange={handleCharacterChange}
                placeholder="Personality"
                className="p-2 text-black rounded"
              />
              <button
                onClick={editingId ? saveEdit : addCharacter}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingId ? "Save Edit" : "Add Character"}
              </button>
            </div>

            {/* Characters Table */}
            {characters.length > 0 && (
              <table className="w-full mt-4">
                <thead>
                  <tr className="bg-gray-600">
                    <th className="p-2">Name</th>
                    <th className="p-2">Description</th>
                    <th className="p-2">Personality</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {characters.map(character => (
                    <tr key={character.id} className="border-b border-gray-600">
                      <td className="p-2">{character.name}</td>
                      <td className="p-2">{character.description}</td>
                      <td className="p-2">{character.personality}</td>
                      <td className="p-2">
                        <button
                          onClick={() => startEditing(character)}
                          className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteCharacter(character.id)}
                          className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Genre and Tone Selection */}
          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>
            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={() =>
              append({
                role: "user",
                content: `Generate a ${state.genre} story in a ${state.tone} tone featuring these characters: ${JSON.stringify(characters)}`
              })
            }
          >
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
        </div>
      </div>
    </main>
  );
}