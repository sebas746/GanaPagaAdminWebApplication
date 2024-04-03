import { IPromoter } from '../../types/Promoter.types';
import { AUTH_TOKEN, PROMOTERS_LIST, PROMOTER_ID, PROMOTER_LOGO } from '../constants/localstorage.constants';

export const isLoggedIn = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return token !== null;
};

export const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const setStoragePromoterId = (promoterId: string) => {
  localStorage.setItem(PROMOTER_ID, promoterId)
}

export const setPromoterLogoUrl = (promoterLogo: string) => {
  localStorage.setItem(PROMOTER_LOGO, promoterLogo)
}

export const getStoragePromoterLogo = () => {
  return localStorage.getItem(PROMOTER_LOGO)
}

export const getStoragePromoterId = () => {
  return localStorage.getItem(PROMOTER_ID)
}

export const removeStoragePromoterId = () => {
  localStorage.removeItem(PROMOTER_ID)
}

