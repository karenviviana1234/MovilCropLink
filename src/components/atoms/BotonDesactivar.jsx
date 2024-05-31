function BotonDesactivar({ row }) {
    function confirmDesactivar() {
      const confirmDesactivar = window.confirm(
        "¿Estás seguro de que deseas desactivar este Usuario?"
      );
      if (confirmDesactivar) {
        console.log("Usuario desactivado:", row);
      }
    }
  
    return (
      <button
        className="bg-[#ED6158] p-2 rounded-lg text-sm font-bold mt-2"
        type="button"
        onClick={confirmDesactivar}
      >
        Desactivar
      </button>
    );
  }
  
  export default BotonDesactivar;
  