import { useEffect, useState } from "react"
import { IPromoterInfo } from "../../types/Promoter.types"
import { ReactQueryResponse } from "../../types/Generics"
import axios from '../config/http-common'
import { useQuery } from "react-query"

export const usePromoterInfo = () => {
    const [promoterInfo, setPromoterInfo] = useState({} as IPromoterInfo)

    const {
        data: promoterInfoData,
        isFetching,
        refetch: getPromoterInfo,
      } = useQuery<ReactQueryResponse<IPromoterInfo>>('get-promoter-info', async () => {
        return await axios.get(`/Promoter/get-promoter-info`)
      })

    useEffect(() => {
        if(!isFetching && promoterInfoData) {
            setPromoterInfo(promoterInfoData?.data.response)
        }
    }, [promoterInfoData])  

    return { promoterInfo, getPromoterInfo }  
}