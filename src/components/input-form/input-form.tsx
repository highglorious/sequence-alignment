import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";

const AMINO_ACIDS = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

export type FormData = {
  top: string;
  bottom: string;
};

type InputProps = {
  onSubmit: (data: FormData) => void;
};

const InputForm = ({ onSubmit }: InputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Последовательность 1"
        fullWidth
        margin="normal"
        {...register("top", {
          required: "Обязательное поле",
          pattern: {
            value: AMINO_ACIDS,
            message: "Недопустимые буквы или символы",
          },
          setValueAs: (v) => v.toUpperCase(),
        })}
        error={!!errors.top}
        helperText={errors.top?.message}
      />

      <TextField
        label="Последовательность 2"
        fullWidth
        margin="normal"
        {...register("bottom", {
          required: "Обязательное поле",
          validate: (value, { top }) =>
            value.length === top.length ||
            "Длина должна совпадать с первой последовательностью",
          pattern: {
            value: AMINO_ACIDS,
            message: "Недопустимые буквы или символы",
          },
          setValueAs: (v) => v.toUpperCase(),
        })}
        error={!!errors.bottom}
        helperText={errors.bottom?.message}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!isValid}
        fullWidth
      >
        Сравнить
      </Button>
    </Box>
  );
};

export default InputForm;
