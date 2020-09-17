import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core/";
import isEmpty from "is-empty";
import {
  StyleButton,
  FormContainer,
  StyleTextfield,
  RowContainer,
} from "./styles";

export const AlertDialog = ({ open, handleClose, submit, currentData }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar Post.</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Esta Seguro de eliminar un post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="sencondary">
            Cancelar
          </Button>
          <Button
            onClick={() => submit(currentData.id)}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  currentData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const Modal = ({ open, handleClose, submit, edit, currentData }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (currentData) setData(currentData);
    else {
      setData({
        name: "",
        description: "",
      });
      setErrors({
        name: "",
        description: "",
      });
    }
  }, [currentData, open]);

  const handleChange = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true;
    const errorsForm = {};

    if (isEmpty(data.name)) {
      valid = false;
      errorsForm.name = "Ingrese un nombre";
    }
    if (isEmpty(data.description)) {
      valid = false;
      errorsForm.description = "Ingrese una descripción";
    }

    setErrors(errorsForm);
    submit(data, valid);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>{edit ? "Edición de post" : "Registro de post"}</DialogTitle>
      <DialogContent>
        <FormContainer>
          <RowContainer>
            <StyleTextfield
              label="Nombre"
              value={data.name}
              helperText={errors.name}
              error={!isEmpty(errors.name)}
              name="name"
              onChange={handleChange}
            />
            <StyleTextfield
              label="Descripción"
              value={data.description}
              helperText={errors.description}
              error={!isEmpty(errors.description)}
              name="description"
              onChange={handleChange}
            />
          </RowContainer>
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <StyleButton
          onClick={handleClose}
          variant="contained"
          color="secondary"
        >
          Cancelar
        </StyleButton>
        <StyleButton onClick={handleSubmit} variant="contained" color="primary">
          {edit ? "Actualizar Post" : "Registrar Post"}
        </StyleButton>
      </DialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  currentData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;
