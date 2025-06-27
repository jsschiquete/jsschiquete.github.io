
import React from 'react';
import { CalendarEvent, STATUS_CONFIG } from '@/types/calendar';
import { X, Video, FileText, CalendarPlus } from 'lucide-react';

interface EventModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  // AQUÍ SE GENERA EL ARCHIVO .ICS PARA AÑADIR AL CALENDARIO
  const generateIcsFile = (event: CalendarEvent) => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const start = formatDate(event.fecha);
    const endDate = new Date(event.fecha);
    endDate.setHours(endDate.getHours() + 2);
    const end = formatDate(endDate);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sioltalife//Calendario Curso//ES',
      'BEGIN:VEVENT',
      `UID:${event.id}@sioltalife.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${event.titulo}`,
      `DESCRIPTION:${event.descripcion.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.enlaceZoom || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    return icsContent;
  };

  const downloadIcsFile = () => {
    const icsContent = generateIcsFile(event);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `evento-${event.titulo.replace(/\s+/g, '-')}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
  };

  const statusConfig = STATUS_CONFIG[event.estado];

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className={`w-5 h-5 rounded-full ${
            event.estado === 'delivered' ? 'bg-green-500' :
            event.estado === 'pending' ? 'bg-yellow-500' : 
            'bg-red-500'
          }`} />
          <h2 className="text-2xl font-bold text-gray-900">{event.titulo}</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex">
            <span className="font-semibold text-blue-600 min-w-24">Fecha:</span>
            <span className="text-gray-700">{formatDate(event.fecha)}</span>
          </div>
          
          <div className="flex">
            <span className="font-semibold text-blue-600 min-w-24">Hora:</span>
            <span className="text-gray-700">{event.hora}</span>
          </div>
          
          <div className="flex">
            <span className="font-semibold text-blue-600 min-w-24">Estado:</span>
            <span className="text-gray-700">{statusConfig.text}</span>
          </div>
          
          <div className="flex">
            <span className="font-semibold text-blue-600 min-w-24">Descripción:</span>
            <span className="text-gray-700">{event.descripcion}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {event.enlaceZoom && (
            <a
              href={event.enlaceZoom}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Video className="w-4 h-4" />
              Unirse a Zoom
            </a>
          )}
          
          <a
            href={event.enlaceMaterial}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Ver Material
          </a>
          
          <button
            onClick={downloadIcsFile}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <CalendarPlus className="w-4 h-4" />
            Añadir a Calendario
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 w-4" />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
