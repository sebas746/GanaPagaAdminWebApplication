import {useFormik} from 'formik'

export const useAddRaffleAnimalitoResultForm = (
  addRaffleAnimalitosResult: (selectedAnimal: string) => void,
  selectedOption: string,
  selectedFruitOption?: string,
  isLotteryFruitCombined?: boolean,
  lotteryId?: number
) => {
  const formik = useFormik({
    initialValues: {
      animalitoId: selectedOption,
      fruitId: selectedFruitOption,
    },
    onSubmit: (values) => {
      if (!isLotteryFruitCombined && lotteryId !== 3) {
        addRaffleAnimalitosResult(values.animalitoId.toString())
      } else if (!isLotteryFruitCombined && lotteryId === 3) {
        if (values.animalitoId) {
          addRaffleAnimalitosResult(values.animalitoId.toString())
        } else if (values.fruitId) {
          addRaffleAnimalitosResult(values.fruitId.toString())
        }
      } else {
        addRaffleAnimalitosResult(`${values.animalitoId.toString()}-${values.fruitId?.toString()}`)
      }
    },
    validate: (values) => {
      const errors = {} as any

      if (!values.animalitoId && (lotteryId !== 3 || !values.fruitId)) {
        errors[lotteryId === 3 ? 'fruitId' : 'animalitoId'] = 'Parámetro requerido'
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
