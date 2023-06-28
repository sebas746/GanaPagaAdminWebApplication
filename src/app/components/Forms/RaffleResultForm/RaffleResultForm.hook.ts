import {useFormik} from 'formik'
import {RaffleResultsForm} from '../../../../types/Forms.types'

export const useRaffleResultForm = (
  raffleFormState: RaffleResultsForm,
  setRaffleForm: (form: RaffleResultsForm) => void
) => {
  const formik = useFormik({
    initialValues: {
      date: raffleFormState.date,
      raffleResultStateId: raffleFormState.raffleResultStateId,
    },
    onSubmit: (values) => {
      setRaffleForm(values)
    },
  })

  return {
    formik,
  }
}
