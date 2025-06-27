
import { useState, useMemo } from 'react';
import { CalendarEvent, CALENDAR_EVENTS } from '@/types/calendar';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // Agosto 2025

  // AQUÍ SE PUEDEN FILTRAR LOS EVENTOS POR FECHA O ESTADO
  const events = useMemo(() => {
    return CALENDAR_EVENTS; // MODIFICAR AQUÍ SI QUIERES FILTRAR EVENTOS
  }, []);

  const goToPrevMonth = () => {
    // Solo permite navegar hasta Agosto 2025
    if (!(currentDate.getMonth() === 7 && currentDate.getFullYear() === 2025)) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const goToNextMonth = () => {
    // Solo permite navegar hasta Septiembre 2025
    if (!(currentDate.getMonth() === 8 && currentDate.getFullYear() === 2025)) {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => 
      event.fecha.getDate() === date.getDate() && 
      event.fecha.getMonth() === date.getMonth() && 
      event.fecha.getFullYear() === date.getFullYear()
    );
  };

  const canGoPrev = !(currentDate.getMonth() === 7 && currentDate.getFullYear() === 2025);
  const canGoNext = !(currentDate.getMonth() === 8 && currentDate.getFullYear() === 2025);

  return {
    currentDate,
    events,
    goToPrevMonth,
    goToNextMonth,
    getEventsForDate,
    canGoPrev,
    canGoNext
  };
};