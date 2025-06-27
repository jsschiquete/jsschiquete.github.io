// CONFIGURACIÓN DE EVENTOS Y ESTATUS DEL CALENDARIO

export interface CalendarEvent {
  id: number;
  titulo: string;
  fecha: Date;
  hora: string;
  descripcion: string;
  estado: EventStatus;
  enlaceMaterial: string;
  enlaceZoom?: string;
}

// AQUÍ DEFINES LOS TIPOS DE ESTATUS DISPONIBLES
// PARA AGREGAR UN NUEVO ESTATUS: añade el nombre aquí separado por |
export type EventStatus = 'delivered' | 'pending' | 'delayed';

// AQUÍ CAMBIAS LOS TÍTULOS Y COLORES DE CADA ESTATUS
// PARA MODIFICAR UN ESTATUS: cambia el 'text' y el 'colorClass'
// PARA AGREGAR UN NUEVO ESTATUS: añade una nueva línea con el formato existente
export const STATUS_CONFIG = {
  delivered: { text: 'Entregado', colorClass: 'status-delivered' },
  pending: { text: 'Pendiente', colorClass: 'status-pending' },
  delayed: { text: 'Retrasado', colorClass: 'status-delayed' }
  // EJEMPLO PARA AGREGAR NUEVO ESTATUS:
  // completed: { text: 'Completado', colorClass: 'status-completed' }
};

// AQUÍ AGREGAS, ELIMINAS O MODIFICAS EVENTOS
// PARA AGREGAR UN EVENTO: copia un evento existente y modifica sus valores
// PARA ELIMINAR UN EVENTO: borra completamente su bloque
// PARA MODIFICAR UN EVENTO: cambia los valores de sus propiedades
export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1, // ID único del evento
    titulo: "Sesión 1: Introducción", // TÍTULO DEL EVENTO
    fecha: new Date(2025, 7, 4), // FECHA (año, mes-1, día) - Agosto 4
    hora: "10:00 - 12:00", // HORA DEL EVENTO
    descripcion: "Primera sesión del módulo. Presentación del profesor y del programa.", // DESCRIPCIÓN DETALLADA
    estado: "delivered", // ESTATUS DEL EVENTO (debe coincidir con STATUS_CONFIG)
    enlaceMaterial: "https://ejemplo.com/material1", // ENLACE AL MATERIAL
    enlaceZoom: "https://zoom.us/sesion1" // ENLACE DE ZOOM (opcional)
  },
  {
    id: 2,
    titulo: "Actividad 1: Lluvia de ideas", // CAMBIAR TÍTULO AQUÍ
    fecha: new Date(2025, 7, 6), // CAMBIAR FECHA AQUÍ - Agosto 6
    hora: "15:00 - 16:00", // CAMBIAR HORA AQUÍ
    descripcion: "Actividad grupal para definir conceptos clave de investigación clínica.", // CAMBIAR DESCRIPCIÓN AQUÍ
    estado: "pending", // CAMBIAR ESTATUS AQUÍ
    enlaceMaterial: "https://mentimeter.com/actividad1", // CAMBIAR ENLACE MATERIAL AQUÍ
    enlaceZoom: "" // SIN ZOOM PARA ESTE EVENTO
  },
  {
    id: 3,
    titulo: "Sesión 2: Historia y Evolución",
    fecha: new Date(2025, 7, 11), // Agosto 11
    hora: "10:00 - 12:00",
    descripcion: "Análisis de los hitos históricos más importantes en investigación clínica.",
    estado: "pending",
    enlaceMaterial: "https://ejemplo.com/material2",
    enlaceZoom: "https://zoom.us/sesion2"
  },
  {
    id: 4,
    titulo: "Entrega: Trabajo de investigación",
    fecha: new Date(2025, 7, 18), // Agosto 18
    hora: "23:59",
    descripcion: "Fecha límite para la entrega del primer trabajo de investigación.",
    estado: "delayed",
    enlaceMaterial: "https://classroom.google.com/entregas",
    enlaceZoom: ""
  },
  {
    id: 5,
    titulo: "Sesión 3: Ética en investigación",
    fecha: new Date(2025, 7, 25), // Agosto 25
    hora: "10:00 - 12:00",
    descripcion: "Principios éticos fundamentales en investigación clínica.",
    estado: "pending",
    enlaceMaterial: "https://ejemplo.com/material3",
    enlaceZoom: "https://zoom.us/sesion3"
  },
  {
    id: 6,
    titulo: "Actividad 2: Casos prácticos",
    fecha: new Date(2025, 8, 1), // Septiembre 1
    hora: "14:00 - 16:00",
    descripcion: "Discusión en grupos pequeños sobre casos prácticos de ética.",
    estado: "pending",
    enlaceMaterial: "https://ejemplo.com/casos-practicos",
    enlaceZoom: "https://zoom.us/sesion-grupos"
  },
  {
    id: 7,
    titulo: "Sesión 4: Metodología de investigación",
    fecha: new Date(2025, 8, 8), // Septiembre 8
    hora: "10:00 - 12:00",
    descripcion: "Fundamentos de la metodología científica aplicada a la investigación clínica.",
    estado: "pending",
    enlaceMaterial: "https://ejemplo.com/material4",
    enlaceZoom: "https://zoom.us/sesion4"
  },
  {
    id: 8,
    titulo: "Examen del Módulo 1",
    fecha: new Date(2025, 8, 15), // Septiembre 15
    hora: "09:00 - 11:00",
    descripcion: "Evaluación de los conocimientos adquiridos durante el módulo 1.",
    estado: "pending",
    enlaceMaterial: "https://ejemplo.com/examen-mod1",
    enlaceZoom: ""
  }
  // PARA AGREGAR MÁS EVENTOS: copia el formato de arriba y pega aquí
  // EJEMPLO:
  // {
  //   id: 9,
  //   titulo: "Nuevo Evento",
  //   fecha: new Date(2025, 8, 20),
  //   hora: "10:00 - 11:00",
  //   descripcion: "Descripción del nuevo evento",
  //   estado: "pending",
  //   enlaceMaterial: "https://ejemplo.com/nuevo",
  //   enlaceZoom: "https://zoom.us/nuevo"
  // }
];

// CONFIGURACIÓN DE MESES DISPONIBLES
export const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const WEEKDAY_NAMES = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];