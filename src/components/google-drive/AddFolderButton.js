import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setName("");
    setModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentFolder === null) return;
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
      <Modal show={modalOpen} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
