import {useFormik} from 'formik'

export const useAddRaffleChanceZodiacResultForm = (
  addRafflechanceZodiacResult: (resultValue: string, starSignId: number) => void,
  raffleResultValue: string,
  starSignId: number
) => {
  const formik = useFormik({
    initialValues: {
      resultValue: raffleResultValue,
      starSignId: starSignId,
    },
    onSubmit: (values) => {
      addRafflechanceZodiacResult(values.resultValue, values.starSignId)
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
      if (!values.starSignId) {
        errors.starSignId = 'Parámetro requerido'
      }
      return errors
    },
  })

  return {
    formik,
  }
}
