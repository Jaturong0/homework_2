"use client";

import { useEffect, useState } from "react";

type Note = {
  id: number;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function addNote() {
    if (!content.trim()) {
      alert("Please enter a note");
      return;
    }

    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    setContent("");
    loadNotes();
  }

  async function deleteNote(id: number) {
    await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    loadNotes();
  }

  async function updateNote(id: number) {
    if (!editingContent.trim()) {
      alert("Content is required");
      return;
    }

    await fetch("/api/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content: editingContent,
      }),
    });

    setEditingId(null);
    setEditingContent("");

    loadNotes();
  }

  return (
    <main className="container">
      <h1 className="title">📝 Notes App</h1>

      <div className="form">
        <input
          className="input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter note..."
        />

        <button
          className="button button-add"
          onClick={addNote}
        >
          Add
        </button>
      </div>

      {notes.length === 0 && (
        <p className="empty">
          No notes yet.
        </p>
      )}

      {notes.map((note) => (
        <div
          key={note.id}
          className="note-card"
        >
          {editingId === note.id ? (
            <>
              <input
                className="input"
                value={editingContent}
                onChange={(e) =>
                  setEditingContent(
                    e.target.value
                  )
                }
              />

              <div className="actions">
                <button
                  className="button button-save"
                  onClick={() =>
                    updateNote(note.id)
                  }
                >
                  Save
                </button>

                <button
                  className="button button-cancel"
                  onClick={() => {
                    setEditingId(null);
                    setEditingContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="note-content">
                {note.content}
              </div>

              <div className="note-date">
                {new Date(
                  note.createdAt
                ).toLocaleString()}
              </div>

              <div className="actions">
                <button
                  className="button button-edit"
                  onClick={() => {
                    setEditingId(note.id);
                    setEditingContent(
                      note.content
                    );
                  }}
                >
                  Edit
                </button>

                <button
                  className="button button-delete"
                  onClick={() =>
                    deleteNote(note.id)
                  }
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </main>
  );

}