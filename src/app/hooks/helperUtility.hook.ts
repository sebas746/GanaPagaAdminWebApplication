export const useHelperUtility = () => {
  const calculatePercentage = (total: number, value: number) => {
    return Math.ceil((value / total) * 100)
  }
  return {calculatePercentage}
}
