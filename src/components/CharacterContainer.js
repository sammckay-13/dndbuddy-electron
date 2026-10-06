// FlexContainer.js
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import PlayerCharacter from "../Classes/PlayerCharacter";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { addItemsFromImport } from "../app";

export const playerCharacterInstance = new PlayerCharacter();

//!These need to be extended scope so I can use them in app.jsx. There's probably a better way of doing this but I don't know it
export function getGold() {
  return playerCharacterInstance._Gold;
}

export function setGold(newGold) {
  let goldInput = document.getElementById("goldInput");
  goldInput.value = newGold;
  playerCharacterInstance._Gold = newGold;
}

//& The function that adds items to the playerCharacterInstance inventory
export function setItems(itemType, item, bought = true) {
  if (itemType == "weapon" && bought) {
    playerCharacterInstance._Weapons.push(item);
  } else if (itemType == "armor" && bought) {
    playerCharacterInstance._Armors.push(item);
  } else if (itemType == "spell" && bought) {
    playerCharacterInstance._Spells.push(item);
  } else if (!bought) {
    playerCharacterInstance._equipped.push(item);
    console.log(playerCharacterInstance._equipped);
  }
}

//^ Function that removes an item from the playerCharacterInstance inventory without iteration
export function removeItem(itemType, item) {
  const indexOfItem = playerCharacterInstance._Weapons.indexOf(item);
  if (itemType == "weapon") {
    playerCharacterInstance._Weapons.splice(indexOfItem, indexOfItem);
    console.log(playerCharacterInstance._Weapons);
  } else if (itemType == "armor") {
    playerCharacterInstance._Armors.splice(indexOfItem, indexOfItem);
  } else if (itemType == "spell") {
    playerCharacterInstance._Spells.splice(indexOfItem, indexOfItem);
  }
}

export function CharacterContainer() {
  const [showFileModal, setShowFileModal] = useState(false);
  const handleCloseFileModal = () => setShowFileModal(false);
  const handleShowFileModal = () => setShowFileModal(true);

  //Handle change when modifying any of the text boxes for character info.
  function handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const placeholder = event.target.placeholder;
    //Uses the placeholder variable to call setter functions to change the value of the member variable
    playerCharacterInstance[`_${placeholder}`] = value;
  }

  function createJSON() {
    //Turn the playercharacter instance to a JSON string
    const jsonData = JSON.stringify(playerCharacterInstance);
    const blob = new Blob([jsonData], { type: "application/json" });
    //URL can be created using the JSON data
    const url = URL.createObjectURL(blob);

    //Create a link element, turn the href into a download link, name the file
    const a = document.createElement("a");
    a.href = url;
    a.download =
      playerCharacterInstance.getPlayerNameString +
      "-" +
      playerCharacterInstance.getCharNameString +
      ".json";
    //then click the download link
    a.click();

    // Clean up by revoking the URL object
    URL.revokeObjectURL(url);
  }

  async function importJSON() {
    const fileInput = document.getElementById("PCFileInput");
    if (fileInput.value) {
      const file = fileInput.files[0];
      const type = file.type;
      if (type == "application/json") {
        var reader = new FileReader();
        //Wait for reader to load, then parse the json object, then update the attributes of the playerCharacterInstance
        reader.onload = function (event) {
          var jsonObj = JSON.parse(event.target.result);
          playerCharacterInstance._Weapons = [];

          playerCharacterInstance.updateCharacterData(jsonObj);
          updateFormValues();
        };
        reader.readAsText(file);
      } else {
        handleShowFileModal();
      }
    } else {
      handleShowFileModal();
    }
  }

  function updateFormValues() {
    //I'm really proud of this. I didn't really look anything up - it iterates through all of the results for controlForms which are all
    //of the sections with text and number slots and changes the value of each one depending on their placeholder value
    const allForms = document.getElementsByClassName("controlForms");
    for (let i = 0; i < allForms.length; i++) {
      const placeholder = allForms[i].placeholder;
      allForms[i].value = playerCharacterInstance[`_${placeholder}`];
    }
    addItemsFromImport();
    console.log(playerCharacterInstance);
  }

  return (
    <div id="characterContainer">
      <div id="flexContainer">
        <Modal show={showFileModal} onHide={handleCloseFileModal}>
          <Modal.Header closeButton>
            <Modal.Title>Oopsies!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              I can only accept JSON files! Make sure you clicked the right
              file!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFileModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* These floating labels are what allow the input fields to shrink the placeholder text */}
        <FloatingLabel
          controlId="floatingInput"
          label="Player Name"
        >
          {/* This is what allows the form to be submitted */}
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="PlayerName"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="CharacterName" label="Character Name">
          <Form.Control
            className="controlForms"
            type="CharName"
            placeholder="CharacterName"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Race"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="CharacterRace"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Character Class"
          className="mb-3"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="CharacterClass"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Alignment"
        >
          <Form.Control
            className="controlForms"
            type="text"
            placeholder="Alignment"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Level" className="mb-3">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Level"
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Gold" className="mb-3">
          <Form.Control
            className="controlForms"
            type="number"
            placeholder="Gold"
            defaultValue={0}
            id="goldInput"
            onChange={handleChange}
          />
        </FloatingLabel>
        <div id="buttonDiv">
          <button type="submit" className="CharBtn" onClick={createJSON}>
            Save
          </button>
          <button className="CharBtn" onClick={importJSON}>Import</button>
          <input type="file" id="PCFileInput" accept="application/json"></input>
        </div>
      </div>
    </div>
  );
}
