import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { OFFSET } from "../../utils/alignment";

const AMINO_ACIDS = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;

export type InputData = {
  top: string;
  bottom: string;
};

type InputProps = {
  onSubmit: (data: InputData) => void;
};

const InputForm = ({ onSubmit }: InputProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InputData>({ mode: "onChange", shouldUnregister: true });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ pl: `${OFFSET}ch` }}
    >
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
        })}
        error={!!errors.top}
        helperText={errors.top?.message}
        onChange={(e) =>
          setValue("top", e.target.value.toUpperCase(), {
            shouldValidate: true,
          })
        }
      />

      <TextField
        label="Последовательность 2"
        fullWidth
        margin="normal"
        {...register("bottom", {
          required: "Обязательное поле",
          validate: (value, { top }) => {
            if (!top) return true;
            return (
              value.length === top.length ||
              "Длина должна совпадать с первой последовательностью"
            );
          },
          pattern: {
            value: AMINO_ACIDS,
            message: "Недопустимые буквы или символы",
          },
        })}
        error={!!errors.bottom}
        helperText={errors.bottom?.message}
        onChange={(e) =>
          setValue("bottom", e.target.value.toUpperCase(), {
            shouldValidate: true,
          })
        }
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
