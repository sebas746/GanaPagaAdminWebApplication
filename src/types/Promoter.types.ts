export interface IPromoter {
    promoterId: number
    promoterName: string
    promoterIsAdmin: boolean
    promoterEmail: string
}

export interface IPromoterInfo {
    promoterId: number
    promoterName: string
    promoterIsAdmin: boolean
    promoterEmail: string
    promoterLogo?: string
    promoterDescription?: string
}