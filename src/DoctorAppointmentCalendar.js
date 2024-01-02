import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate} from 'react-router-dom';
import AppointmentModal from './AppointmentModal'
import AppointmentDetailsModal from './AppointmentDetailsModal'
import styled from 'styled-components';


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const CalendarContainer = styled.div`
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: center;
  font-size: 1.6rem;
`;



const Select = styled.select`
  margin-right: 10px;
  font-size: 1.6rem;
`;

const Button = styled.button`
  margin-left: 10px;
  font-size: 1.6rem;
  background-color: #2196f3; /* Match the color with the other buttons */
  color: white; /* Text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const useLocalStorage = (key, initialValue) => {
  const storedValue = JSON.parse(localStorage.getItem(key)) || initialValue;
  const [value, setValue] = useState(storedValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};



const DoctorAppointmentCalendar = () => {
  const { month, year } = useParams();
  const [selectedMonth, setSelectedMonth] = useState(parseInt(month, 10) || new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(parseInt(year, 10) || 2019);
//   const [appointments, setAppointments] = useState({
//     // Sample data, you can replace this with your actual data
//     '2019-01-01': [
//         { name: 'abir', time: '10:00 AM', description: 'Appointment 1' },
//         { time: '02:00 PM', description: 'Appointment 2' },
//         { time: '04:00 PM', description: 'Appointment 3' },
//         { time: '06:00 PM', description: 'Appointment 4' },
//       ],
//       '2019-01-02': [
//         { time: '01:30 PM', description: 'Appointment 5' },
//         { time: '03:30 PM', description: 'Appointment 6' },
//         { time: '05:30 PM', description: 'Appointment 7' },
//       ],
//     // ... other dates
//   });
const [appointments, setAppointments] = useLocalStorage('appointments', {});

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const { reset } = useForm();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  

  const openDetailsModal = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedAppointment(null);
    setDetailsModalOpen(false);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

//   const handleAppointmentClick = (date, time, description) => {
//     // Set the selected appointment for the clicked date and time
//     const selectedAppointment = appointments[date].find(
//       (appointment) => appointment.time === time && appointment.description === description
//     );
  
//     // Open the modal with appointment details
//     openDetailsModal(selectedAppointment);
//   };
  

  const generateCalendar = () => {
    const calendar = [];
    let dayCounter = 1;

    for (let row = 0; row < 6; row++) {
      const rowContent = [];

      for (let col = 0; col < 7; col++) {
        if (dayCounter <= daysInMonth) {
          const currentDate = new Date(selectedYear, selectedMonth - 1, dayCounter+1);
          const dateString = currentDate.toISOString().split('T')[0];
          const dayAppointments = appointments[dateString] || [];

          dayAppointments.sort((a, b) => {
            const timeA = a.time.split(':').map(Number);
            const timeB = b.time.split(':').map(Number);
            return timeA[0] - timeB[0] || timeA[1] - timeB[1];
          });

          rowContent.push(
            <div
              key={dateString}
              style={{
                position: 'relative',
                minHeight: '200px',
                maxHeight: '200px', 
                overflowY: 'auto', 
                padding: '10px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '2rem',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{dayCounter}</div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: '0',
                  margin: '5px 0 0 0',
                }}
              >
                {dayAppointments.map((appointment, index) => (
                <li
                    key={`${dateString}-${appointment.time}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => openDetailsModal(appointment)}
                >
                    {appointment.time}: {appointment.description}
                </li>
                ))}
              </ul>
            </div>
          );
        } else {
          rowContent.push(
            <div
              key={`empty-${row}-${col}`}
              style={{
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            ></div>
          );
        }

        dayCounter++;
      }

      calendar.push(
        <div
          key={`row-${row}`}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '1px',
          }}
        >
          {rowContent}
        </div>
      );
    }

    return calendar;
  };

  const handleCreateAppointment = (data) => {
    const date = new Date(data.date);
  
    const dateKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const newAppointment = {
      time: data.time,
      description: `${data.name} - ${data.gender}, ${data.age} years old`,
      name: data.name,
      gender: data.gender,
      age: data.age,
      date: data.date,
    };
  
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [dateKey]: [...(prevAppointments[dateKey] || []), newAppointment],
    }));
  
    const allAppointments = JSON.parse(localStorage.getItem('appointments')) || {};
    localStorage.setItem('appointments', JSON.stringify({
      ...allAppointments,
      [dateKey]: [...(allAppointments[dateKey] || []), newAppointment],
    }));
  
    setShowCreateModal(false);
    reset();
  };
  
  

  useEffect(() => {
    navigate(`/year/${selectedYear}/month/${selectedMonth}`);
  }, [selectedYear, selectedMonth, navigate]);

  return (
    <Container>
      <CalendarContainer>
        <Header>
          <Select value={selectedMonth} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(selectedYear, i, 1).toLocaleString('en-US', { month: 'long' })}
              </option>
            ))}
          </Select>
          <Select value={selectedYear} onChange={handleYearChange}>
            {Array.from({ length: 3 }, (_, i) => (
              <option key={i} value={selectedYear - i}>
                {selectedYear - i}
              </option>
            ))}
          </Select>
          <Button onClick={() => setShowCreateModal(true)}>
            Create Appointment
          </Button>
        </Header>
        {generateCalendar()}
        {showCreateModal && (
          <AppointmentModal
            isOpen={showCreateModal}
            onRequestClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateAppointment}
          />
        )}
      </CalendarContainer>
      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onRequestClose={closeDetailsModal}
        appointmentDetails={selectedAppointment}
      />
    </Container>
  );

};

export default DoctorAppointmentCalendar;
