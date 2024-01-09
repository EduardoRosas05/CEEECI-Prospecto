import { useState } from 'react';

const productForm = ({ onSubmit }) => {
    
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, cantidad, precio });
    setNombre('');
    setCantidad(0);
    setPrecio(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Cantidad:
        <input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
      </label>
      <label>
        Precio:
        <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
      </label>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default productForm;
