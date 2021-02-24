import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

export default ({ weet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWeet, setNewWeet] = useState(weet.text);

  const onDelete = async () => {
    const ok = window.confirm("Are You sure you want to delete this weet?");
    if (ok) {
      await dbService.collection("weets").doc(weet.id).delete();
      await storageService.refFromURL(weet.attatchmentUrl).delete();
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value) setNewWeet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("weets").doc(weet.id).update({ text: newWeet });
    setEditing(false);
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <li>
      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={newWeet}
            onChange={onChange}
            placeholder="Typing on here"
            required
          />
          <input type="submit" value="edit" />
        </form>
      ) : (
        <p>{weet?.text}</p>
      )}
      {weet.attatchmentUrl && <img src={weet.attatchmentUrl} width={50} />}
      {isOwner && (
        <>
          <button onClick={toggleEditing}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </li>
  );
};
