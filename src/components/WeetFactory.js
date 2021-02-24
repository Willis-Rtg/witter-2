import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputWeet = styled.div`
  display: flex;
  color: skyblue;
`;
const LabelPhoto = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: skyblue;
`;

const WeetFactory = ({ userObj }) => {
  const [weet, setWeet] = useState("");
  const [attatchment, setAttachment] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setWeet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let attatchmentUrl = "";
    if (attatchment != "") {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attatchment, "data_url");
      attatchmentUrl = await response.ref.getDownloadURL();
    }
    const weetObj = {
      text: weet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attatchmentUrl,
    };
    await dbService.collection("weets").add(weetObj);
    setWeet("");
    setAttachment("");
  };
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
      <InputWeet>
        <input
          name="weet"
          type="text"
          placeholder="What's on Your mind"
          maxLength={120}
          value={weet}
          onChange={onChange}
        />
        <div>
          <label for="submit">
            <i class="fab fa-twitter"></i>
          </label>
          <input
            id="submit"
            type="submit"
            value="Weet"
            style={{ display: "none" }}
          />
        </div>
      </InputWeet>
      <div>
        <LabelPhoto for="image-upload">
          <p style={{ fontSize: 10 }}>Add photos </p> &nbsp;
          <FontAwesomeIcon icon={faPlus} />
        </LabelPhoto>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </div>
      {attatchment && (
        <div>
          <img src={attatchment} width={50} />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default WeetFactory;
