import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    fontSize: '24px',
    width: '40vw',
    height: '60vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: '#f8f8f8',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

const ModalContainer = styled(Modal).attrs({
  style: customStyles,
})`
  & h2 {
    margin-bottom: 24px;
    color: #333;
  }

  & div {
    text-align: left;
    margin-bottom: 20px;
  }

  & p {
    margin: 8px 0;
    color: #555;
  }

  & button {
    padding: 14px 28px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  & button:hover {
    background-color: #0d47a1;
  }
`;

const AppointmentDetailsModal = ({ isOpen, onRequestClose, appointmentDetails }) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Appointment Details"
    >
      <h2>Appointment Details</h2>
      {appointmentDetails && (
        <div>
          <p><strong>Name:</strong> {appointmentDetails.name}</p>
          <p><strong>Gender:</strong> {appointmentDetails.gender}</p>
          <p><strong>Age:</strong> {appointmentDetails.age}</p>
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.time}</p>
        </div>
      )}
      <button onClick={onRequestClose}>Close</button>
    </ModalContainer>
  );
};

export default AppointmentDetailsModal;
