import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit, Delete } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { Table, LoadingSnackbar } from "../../components";
import { getPost, newPost, editPost, deletePost } from "../../actions/post";
import { Modal, AlertDialog } from "./Modal";
import { StyleButton, StyleButtonRight } from "./styles";

const TablePost = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const initialSnackbarRef = useRef();
  const mountedRef = useRef(true);
  const { data, loading, errorRequest } = useSelector((state) => state.post);

  useEffect(() => {
    if (loading) {
      initialSnackbarRef.current = enqueueSnackbar("Cargando...", {
        variant: "default",
        persist: true,
        content: (key, message) => (
          <LoadingSnackbar id={key} message={message} />
        ),
      });
    }
    return () => {
      mountedRef.current = false;
      closeSnackbar(initialSnackbarRef.current);
    };
  }, [loading, enqueueSnackbar, closeSnackbar]);

  useEffect(() => {
    if (errorRequest) {
      enqueueSnackbar("Error al realizar la operación solicitada.", {
        variant: "error",
      });
    }
  }, [errorRequest, enqueueSnackbar]);

  const doRequest = useCallback(async () => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    doRequest();
  }, [doRequest]);

  const handleClose = () => {
    setOpen(false);
    setSelectedRowData(null);
    setEdit(false);
  };

  const handleCloseAletDialog = () => {
    setOpenAlertDialog(false);
    setSelectedRowData(null);
  };

  const columns = [
    { title: "Nombre", field: "name" },
    { title: "Descripción", field: "description" },
  ];

  const handleSummit = (data, valid) => {
    if (valid) {
      if (edit) dispatch(editPost(data));
      else dispatch(newPost(data));

      handleClose();
    } else {
      enqueueSnackbar("Error, Algunos campos se encuentran vacios", {
        variant: "error",
      });
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    handleCloseAletDialog();
  };

  const actions = [
    {
      icon: (key) => (
        <StyleButton
          key={key}
          color="primary"
          variant="contained"
          startIcon={<Edit />}
          size="medium"
        >
          Editar
        </StyleButton>
      ),
      onClick: (event, rowData) => {
        setSelectedRowData(rowData);
        setEdit(true);
        setOpen(true);
      },
    },
    () => ({
      icon: (key) => (
        <StyleButtonRight
          key={key}
          color="secondary"
          variant="contained"
          startIcon={<Delete />}
          size="medium"
        >
          Eliminar
        </StyleButtonRight>
      ),
      onClick: (event, rowData) => {
        setOpenAlertDialog(true);
        setSelectedRowData(rowData);
      },
    }),
    {
      icon: "add",
      isFreeAction: true,
      onClick: () => setOpen(true),
    },
  ];

  return (
    <>
      <Table
        title="Administración de posts"
        columns={columns}
        data={data}
        actions={actions}
      />
      <Modal
        open={open}
        submit={handleSummit}
        handleClose={handleClose}
        edit={edit}
        currentData={selectedRowData}
      />
      <AlertDialog
        open={openAlertDialog}
        currentData={selectedRowData}
        handleClose={handleCloseAletDialog}
        submit={handleDelete}
      />
    </>
  );
};

export default TablePost;
