/* import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Table() {
  const data = [
    {
      nombres: "Karen Viviana",
      apellidos: "Diaz Guevara",
      correo: "kare@gmail.com",
      direccion: "Pitalito",
      finca: "Yamboro",
      rol: "Administrador",
      acciones: (
        <div>
          <BotonActualizar />
          <br />
          <BotonDesactivar />
        </div>
      ),
    },
    {
      nombres: "Karen Viviana",
      apellidos: "Diaz Guevara",
      correo: "kare@gmail.com",
      direccion: "Pitalito",
      finca: "Yamboro",
      rol: "Empleado",
      acciones: (
        <div>
          <BotonActualizar />
          <br />
          <BotonDesactivar />
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row) => row.apellidos,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo,
      sortable: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.direccion,
      sortable: true,
      wrap: true,
    },
    {
      name: "Finca",
      selector: (row) => row.finca,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: "Acciones",
      selector: (row) => row.acciones,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      title="Usuarios registrados"
      fixedHeader
      pagination
      paginationComponentOptions={{
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsText: "Todos",
      }}
      customStyles={{
        head: {
          style: {
            backgroundColor: "#4CAF50",
          },
        },
        headCells: {
          style: {
            color: "#4CAF50",
          },
        },
      }}
    />
  );
}

export default Table;
 */