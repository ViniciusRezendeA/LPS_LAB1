import { Dispatch, SetStateAction, useEffect, useMemo } from "react";

import Checkbox from "@mui/material/Checkbox";

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
} from "@mui/material";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { useNotification } from "../../hooks/useNotification";
import axiosInstance from "../../services/api";
interface IRegistrationRegisterModelProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<boolean>>;
}
interface RegistrationBody {
  studentId: number;
  subjectsIds: number[];
  courseId: number;
}
const RegistrationRegisterModel = (props: IRegistrationRegisterModelProps) => {
  const [subjectsIds, setSubjectsIds] = React.useState<number[]>([]);
  const [courseId, setCourseId] = React.useState<number>();
  const [courseData, setCourseData] = React.useState<any[]>([]);

  useEffect(() => {
    setSubjectsIds([]);
  }, [props.openModal]);
  const { showNotification } = useNotification();

  const uncheckAll = () => {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".checkBox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const makeRegistration = () => {
    uncheckAll();

    const registrationBody: RegistrationBody = {
      studentId: 4, //add user id
      subjectsIds: [],
      courseId: courseId,
    };

    registrationBody.subjectsIds = subjectsIds;
    axiosInstance
      .post(`/registration`, { data: registrationBody })
      .then((response) => {
        showNotification({
          message: response.data.message,
          type: "error",
          title: response.data.title,
        });
        props.setReload(true);
        props.setOpenModal(false);
      })
      .catch((e) => {
        showNotification({
          message: e.response.data.message,
          type: "error",
          title: e.response.data.title,
        });
      });
  };

  const handleClose = () => {
    props.setOpenModal(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        grow: true,
      },
      {
        accessorKey: "discipline.name",
        header: "Disciplina",
      },
      {
        accessorKey: "price",
        header: "Valor",
      },
      {
        accessorKey: "situation",
        header: "Situação",
      },
      {
        accessorKey: "discipline.credits",
        header: "Creditos",
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    enableDensityToggle: false,
    data: courseData,
    //passing the static object variant if no dynamic logic is needed
    muiSelectCheckboxProps: {
      color: "secondary", //makes all checkboxes use the secondary color
    },
    enableRowActions: true,
    columnResizeMode: "onChange",
    positionActionsColumn: "last",
    displayColumnDefOptions: {
      "mrt-row-select": {
        size: 50, //adjust the size of the row select column
        grow: false, //new in v2.8 (default is false for this column)
      },
      "mrt-row-numbers": {
        size: 40,
        grow: true, //new in v2.8 (allow this column to grow to fill in remaining space)
      },
    },
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <Checkbox
          className="checkBox"
          onClick={() => {
            if (row.original.id && subjectsIds.includes(row.original.id)) {
              setSubjectsIds(
                subjectsIds.filter((item) => item !== row.original.id)
              );
            } else {
              setSubjectsIds([...subjectsIds, row.original.id as number]);
            }
          }}
        />
      </Box>
    ),

    muiTableContainerProps: {
      sx: { maxWidth: "100%" },
    },
    muiTopToolbarProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "bold",
        fontSize: "16px",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontWeight: "normal",
        fontSize: "16px",
      },
    },
  });
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.openModal}
      onClose={handleClose}
    >
      <DialogTitle>Materias disponiveis</DialogTitle>
      <DialogContent>
        <Box display={"grid"} className="my-5">
          <Box display={"grid"} className="my-5 gap-5">
            <label>Selecione um curso</label>
            <Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {(function () {
                return courseData.map((course) => {
                  return (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  );
                });
              })()}
            </Select>
          </Box>
          <Box display={"grid"} className="my-5 gap-5">
            <label>Selecione uma disciplina</label>
            <Select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            >
              {(function () {
                return courseData.map((course) => {
                  return (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  );
                });
              })()}
            </Select>
          </Box>
          <MaterialReactTable table={table} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={makeRegistration} variant="outlined">
        Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RegistrationRegisterModel;
