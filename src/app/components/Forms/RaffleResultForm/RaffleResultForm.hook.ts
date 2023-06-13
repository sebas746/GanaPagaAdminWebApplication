import {useFormik} from 'formik'

export const useRaffleResultForm = () => {
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      state: 1,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return {
    formik,
  }
}