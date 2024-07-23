import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SwiftUI } from "./SwiftUI";
import { List, VStack, Text, Button, Input } from "./components";

const App = SwiftUI(() => {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({ date: "", time: "", exercise: "", weight: "" });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addSession = () => {
    if (editId) {
      setSessions(sessions.map(session => session.id === editId ? { ...session, ...form } : session));
      setEditId(null);
    } else {
      setSessions([...sessions, { id: Date.now(), ...form }]);
    }
    setForm({ date: "", time: "", exercise: "", weight: "" });
  };

  const editSession = (id) => {
    const session = sessions.find(s => s.id === id);
    setForm(session);
    setEditId(id);
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>GymTracker</h1>
      <List items={sessions} action={() => {}} editAction={editSession} deleteAction={deleteSession}>
        {item => (
          <VStack alignment="flex-start">
            <Text>{item.date} {item.time}</Text>
            <Text>{item.exercise} - {item.weight} kg</Text>
          </VStack>
        )}
      </List>
      <div style={{ marginTop: 20 }}>
        <h2>{editId ? "Edit Session" : "Add New Session"}</h2>
        <Input name="date" value={form.date} onChange={handleInputChange} placeholder="Date (YYYY-MM-DD)" />
        <Input name="time" value={form.time} onChange={handleInputChange} placeholder="Time (HH:MM)" />
        <Input name="exercise" value={form.exercise} onChange={handleInputChange} placeholder="Exercise Name" />
        <Input name="weight" value={form.weight} onChange={handleInputChange} placeholder="Weight (kg)" />
        <Button onClick={addSession}>{editId ? "Update Session" : "Add Session"}</Button>
      </div>
    </div>
  );
});

ReactDOM.render(<App />, document.getElementById("root"));
