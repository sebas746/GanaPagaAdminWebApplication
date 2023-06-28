import {useFormik} from 'formik'

export const useAddRaffleAnimalitoResultForm = (
  addRaffleAnimalitosResult: (selectedAnimal: string) => void,
  selectedOption: string
) => {
  const formik = useFormik({
    initialValues: {
      animalitoId: selectedOption,
    },
    onSubmit: (values) => {
      addRaffleAnimalitosResult(values.animalitoId.toString())
    },
    validate: (values) => {
      const errors = {} as any

      if (!values.animalitoId) {
        errors.animalitoId = 'Parámetro requerido'
      }
      return errors
    },
  })

  return {
    formik,
  }
}
