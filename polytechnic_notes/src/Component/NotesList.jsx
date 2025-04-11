import React, { useEffect, useState } from "react";
import { databases } from "../appwriteConfig"; // Ensure this import is correct
import NoteCard from "./NoteCard"; // Import your NoteCard component

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Replace with your actual database and collection IDs
    const fetchNotes = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,   // Replace with your Database ID
          import.meta.env.VITE_APPWRITE_COLLECTION_ID  // Replace with your Collection ID
        );
        setNotes(response.documents);
      } catch (err) {
        setError("Failed to fetch notes. Check console for details.");
        console.error("Appwrite Fetch Error:", err);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length > 0 ? (
        notes.map((note) => <NoteCard key={note.$id} note={note} />)
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotesList;
