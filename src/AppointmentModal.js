import React from 'react';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';

const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    content: {
      fontSize: '24px',
      width: '45vw', // Increased width
      height: '65vh', // Increased height
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
      margin-bottom: 24px; // Increased margin
      color: #333;
    }
  
    & form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%; // Increased width
    }
  
    & label {
      margin-bottom: 16px; // Increased margin
      color: #555;
    }
  
    & input {
      padding: 14px; // Increased padding
      margin-bottom: 20px; // Increased margin
      border: 1px solid #bbb;
      border-radius: 6px;
      width: 100%;
      box-sizing: border-box;
      font-size: 1rem
    }
  
    & button {
      padding: 14px 28px; // Increased padding
      margin-top: 16px; // Increased margin
      background-color: #2196f3;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      width: 200px
    }
  
    & button:hover {
      background-color: #0d47a1;
    }
  `;
  

const AppointmentModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const { control, handleSubmit } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onRequestClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Appointment"
    >
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label>
          Name:
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </label>
        <label>
          Gender:
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </label>
        <label>
          Age:
          <Controller
            name="age"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="number" />}
          />
        </label>
        <label>
          Date:
          <Controller
            name="date"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="date" />}
          />
        </label>
        <label>
          Time:
          <Controller
            name="time"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} type="time" />}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </ModalContainer>
  );
};

export default AppointmentModal;
