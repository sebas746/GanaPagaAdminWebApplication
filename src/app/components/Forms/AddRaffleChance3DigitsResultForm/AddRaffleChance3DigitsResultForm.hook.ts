import {useFormik} from 'formik'

export const useAddRaffleChance3DigitsResultForm = (
  addRaffleChance3DigitsResult: (resultValue: string) => void,
  raffleResultValue: string
) => {
  const formik = useFormik({
    initialValues: {
      resultValue: raffleResultValue,
    },
    onSubmit: (values) => {
      addRaffleChance3DigitsResult(values.resultValue)
    },
    validate: (values) => {
      const errors = {} as any
      const regex: RegExp = /^[0-9]*$/

      if (!values.resultValue) {
        errors.resultValue = 'Parámetro requerido'
      } else if (values.resultValue.length > 3 || values.resultValue.length < 3) {
        errors.resultValue = 'El número ingresado debe tener 3 dígitos'
      } else if (!regex.test(values.resultValue)) {
        errors.resultValue = 'El valor debe ser un número'
      }
      return errors
    },
  })

  return {
    formik,
  }
}
