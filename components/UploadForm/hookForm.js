import { useForm } from 'react-hook-form';

const {
  register,
  handleSubmit,
  reset,
  formState,
  formState: { errors },
} = useForm();
