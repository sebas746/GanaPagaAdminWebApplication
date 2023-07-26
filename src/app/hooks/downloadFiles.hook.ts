import {useEffect, useReducer, useState} from 'react'
import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../types/Generics'
import {IDownloadFilesResponse} from '../../types/DownloadFiles.types'
import axios from '../config/http-common'

enum DownloadFilesAction {
  SET_RAFFLE_ID = 'SET_RAFFLE_ID',
  SET_GAME_TYPE = 'SET_GAME_TYPE',
  SET_FILE_TYPE = 'SET_FILE_TYPE',
  SET_DOWNLOAD_URL = 'SET_DOWNLOAD_URL',
  SET_DATA_DOWNLOAD = 'SET_DATA_DOWNLOAD',
}

interface IDownloadFilesState {
  type: DownloadFilesAction
  payload: number | string | IDownloadFilesResponse
}

interface DownloadFilesState {
  raffleId: number
  gameType: string
  fileType: string
  downloadUrl: string
  dataDownload: IDownloadFilesResponse
}

export const downloadFilesReducer = (state: DownloadFilesState, action: IDownloadFilesState) => {
  switch (action.type) {
    case DownloadFilesAction.SET_RAFFLE_ID:
      return {
        ...state,
        raffleId: action.payload as number,
      }
    case DownloadFilesAction.SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.payload as string,
      }
    case DownloadFilesAction.SET_FILE_TYPE:
      return {
        ...state,
        fileType: action.payload as string,
      }
    case DownloadFilesAction.SET_DOWNLOAD_URL:
      return {
        ...state,
        downloadUrl: action.payload as string,
      }
    case DownloadFilesAction.SET_DATA_DOWNLOAD:
      return {
        ...state,
        dataDownload: action.payload as IDownloadFilesResponse,
      }
    default:
      return state
  }
}

export const useDownloadFiles = () => {
  const [downloadFilesState, dispatchDownloadFiles] = useReducer(downloadFilesReducer, {
    raffleId: 0,
    gameType: '',
    fileType: '',
    downloadUrl: '',
    dataDownload: {} as IDownloadFilesResponse,
  })
  const [isInitialRun, setIsInitialRun] = useState(true)

  const setRaffleId = (payload: number) => {
    dispatchDownloadFiles({
      type: DownloadFilesAction.SET_RAFFLE_ID,
      payload,
    })
  }

  const setGameType = (payload: string) => {
    dispatchDownloadFiles({
      type: DownloadFilesAction.SET_GAME_TYPE,
      payload,
    })
  }

  const setFileType = (payload: string) => {
    dispatchDownloadFiles({
      type: DownloadFilesAction.SET_FILE_TYPE,
      payload,
    })
  }

  const setDownloadUrl = (payload: string) => {
    dispatchDownloadFiles({
      type: DownloadFilesAction.SET_DOWNLOAD_URL,
      payload,
    })
  }

  const setDataDownload = (payload: IDownloadFilesResponse) => {
    dispatchDownloadFiles({
      type: DownloadFilesAction.SET_DATA_DOWNLOAD,
      payload,
    })
  }

  const {
    data: downloadFilesData,
    isFetching,
    refetch: getDownloadFile,
  } = useQuery<ReactQueryResponse<IDownloadFilesResponse>>(
    'get-download-url',
    async () => {
      return await axios.get(
        `/ScrutinyReport/get-export-scrutiny-report-by-raffle-and-game/raffleId/${downloadFilesState.raffleId}/gameType/${downloadFilesState.gameType}/fileType/${downloadFilesState.fileType}`
      )
    },
    {
      enabled: !isInitialRun,
    }
  )

  const handleDownloadFileClick = (raffleId: number, gametype: string, fileType: string) => {
    console.log(raffleId)
    setIsInitialRun(true)
    setRaffleId(raffleId)
    setGameType(gametype)
    setFileType(fileType)
    getDownloadFile()
  }

  useEffect(() => {
    if (!isFetching && downloadFilesData) {
      setDataDownload(downloadFilesData?.data.response)
      generateUrlFromBlob(downloadFilesData?.data.response)
    }
  }, [isFetching, downloadFilesData])

  const generateUrlFromBlob = (data: IDownloadFilesResponse) => {
    const byteCharacters = atob(data.fileContents)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], {type: data.contentType})
    const url = URL.createObjectURL(blob)
    setDownloadUrl(url)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', data.fileDownloadName)
    document.body.appendChild(link)
    link.click()
  }

  return {isLoadingDownloadFile: isFetching, downloadFilesState, handleDownloadFileClick}
}
