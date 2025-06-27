
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { EventModal } from './EventModal';
import { CalendarEvent, MONTH_NAMES, WEEKDAY_NAMES, STATUS_CONFIG } from '@/types/calendar';

export const Calendar: React.FC = () => {
  const { 
    currentDate, 
    goToPrevMonth, 
    goToNextMonth, 
    getEventsForDate, 
    canGoPrev, 
    canGoNext 
  } = useCalendar();
  
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEventModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  // AQUÍ SE CALCULA LA ESTRUCTURA DEL CALENDARIO
  const renderCalendarDays = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Ajustar para que la semana comience en Lunes
    const firstDayOfWeek = firstDay.getDay();
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days = [];
    
    // Días vacíos al inicio
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-32 p-3 bg-gray-50 rounded-lg opacity-50" />
      );
    }
    
    // Días del mes
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const eventsForDay = getEventsForDate(date);
      
      days.push(
        <div
          key={i}
          className="min-h-32 p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-white hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        >
          <div className="flex justify-end">
            <span className="text-sm font-semibold text-gray-600">{i}</span>
          </div>
          
          <div className="mt-2 space-y-2">
            {eventsForDay.map((event) => (
              <div
                key={event.id}
                onClick={() => openEventModal(event)}
                className="bg-white rounded-md p-2 text-xs cursor-pointer hover:shadow-md transition-all duration-200 hover:translate-x-1 border-l-3 border-blue-500"
              >
                <div className="font-semibold text-blue-600 mb-1">{event.hora}</div>
                <div className="font-medium text-gray-800 truncate">{event.titulo}</div>
                <div className={`absolute top-0 right-0 w-2 h-full rounded-r ${
                  // AQUÍ SE APLICAN LOS COLORES DE ESTATUS
                  event.estado === 'delivered' ? 'bg-green-500' :
                  event.estado === 'pending' ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} />
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ENCABEZADO DEL CALENDARIO */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-blue-600 mb-4 md:mb-0">Calendario Académico</h1>
          <p className="text-blue-500 font-medium">Agosto-Septiembre 2025 - Planifica tus sesiones y actividades</p>
        </div>
        
        {/* NAVEGACIÓN DEL CALENDARIO */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Calendario del Curso</h2>
          
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevMonth}
              disabled={!canGoPrev}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                canGoPrev 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-xl font-semibold text-gray-800 min-w-48 text-center">
              {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            
            <button
              onClick={goToNextMonth}
              disabled={!canGoNext}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                canGoNext 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* DÍAS DE LA SEMANA */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {WEEKDAY_NAMES.map((day) => (
            <div key={day} className="text-center font-semibold text-blue-600 py-3">
              {day}
            </div>
          ))}
        </div>
        
        {/* DÍAS DEL CALENDARIO */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>

      {/* MODAL DE EVENTO */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeEventModal}
      />
    </div>
  );
};
