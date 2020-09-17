import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import esLocale from 'date-fns/locale/es';

const Table = ({
  columns,
  data,
  title,
  defaultNumberOfRows,
  rowHeight,
  actions,
}) => {
  return (
    <MaterialTable
      columns={columns}
      data={data}
      title={<h1>{title}</h1>}
      actions={actions}
      options={{
        pageSize: defaultNumberOfRows,
        actionsColumnIndex: -1,
        emptyRowsWhenPaging: false,
        rowStyle: {
          height: rowHeight,
        },
        headerStyle: {
          fontWeight: 700,
        },
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay datos disponibles.',
          dateTimePickerLocalization: esLocale,
        },
        header: {
          actions: 'Acciones',
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'Filas',
          labelRowsPerPage: 'Filas por página:',
          firstAriaLabel: 'Primera página',
          firstTooltip: 'Primera página',
          previousAriaLabel: 'Página anterior',
          previousTooltip: 'Página anterior',
          nextAriaLabel: 'Página siguiente',
          nextTooltip: 'Página siguiente',
          lastAriaLabel: 'Última página',
          lastTooltip: 'Última página',
        },
        toolbar: {
          addRemoveColumns: 'Agregar o eliminar columnas',
          nRowsSelected: '{0} registro(s) seleccionado(s)',
          showColumnsTitle: 'Mostrar columnas',
          showColumnsAriaLabel: 'Mostrar columnas',
          exportTitle: 'Exportar',
          exportAriaLabel: 'Exportar',
          exportName: 'Exportar como CSV',
          searchTooltip: 'Buscar',
          searchPlaceholder: 'Buscar',
        }
      }}
    />
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  defaultNumberOfRows: PropTypes.number,
  rowHeight: PropTypes.string,
};

Table.defaultProps = {
  title: '',
  defaultNumberOfRows: 5,
  cellEditable: null,
  rowHeight: '84px',
  actions: [],
};

export default Table;
