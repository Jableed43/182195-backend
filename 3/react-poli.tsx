import React from 'react';

// 1. Definimos la interfaz para las props del componente
interface TarjetaUsuarioProps {
  nombre: string;
  edad: number;
  email?: string; // Prop opcional (marcada con ?)
  rol: 'admin' | 'user' | 'guest'; // Union type para valores específicos
  onSelect?: (id: string) => void; // Función callback opcional
}

// 2. Aplicamos la interfaz al componente
export const TarjetaUsuario: React.FC<TarjetaUsuarioProps> = ({
  nombre,
  edad,
  email = 'No especificado', // Valor por defecto para prop opcional
  rol,
  onSelect,
}) => {
  return (
    <div className="tarjeta">
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
      <p>Email: {email}</p>
      <p>Rol: <strong>{rol}</strong></p>
      
      {onSelect && (
        <button onClick={() => onSelect(nombre)}>
          Seleccionar usuario
        </button>
      )}
    </div>
  );
};