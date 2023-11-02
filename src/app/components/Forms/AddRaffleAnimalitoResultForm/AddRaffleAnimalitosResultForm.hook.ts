import {useFormik} from 'formik'

export const useAddRaffleAnimalitoResultForm = (
  addRaffleAnimalitosResult: (selectedAnimal: string) => void,
  selectedOption: string,
  selectedFruitOption?: string,
  isLotteryFruitCombined?: boolean
) => {
  const formik = useFormik({
    initialValues: {
      animalitoId: selectedOption,
      fruitId: selectedFruitOption,
    },
    onSubmit: (values) => {
      if (!isLotteryFruitCombined) {
        addRaffleAnimalitosResult(values.animalitoId.toString())
      } else {
        addRaffleAnimalitosResult(`${values.animalitoId.toString()}-${values.fruitId?.toString()}`)
      }
    },
    validate: (values) => {
      const errors = {} as any

      if (!values.animalitoId) {
        errors.animalitoId = 'Parámetro requerido'
      }
      if (isLotteryFruitCombined && !values.fruitId) {
        errors.fruitId = 'Parámetro requerido'
      }
      return errors
    },
  })

  return {
    formik,
  }
}
