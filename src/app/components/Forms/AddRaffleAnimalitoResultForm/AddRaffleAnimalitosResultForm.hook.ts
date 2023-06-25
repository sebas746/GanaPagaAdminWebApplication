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
  })

  return {
    formik,
  }
}
