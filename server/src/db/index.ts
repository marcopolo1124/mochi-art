import { getAdminByUsername, postAdmin, updateAdminPassword, deleteAdmin} from "./admin";
import {getState, getGallery, toggleArtTradeState, toggleCommissionState, postImage, deleteImage, getFeatured, getImage} from './site'
import { getCommission, getCommissionsWithStatus, postCommission } from "./commissions";

export default {
    getAdminByUsername,
    postAdmin,
    updateAdminPassword,
    deleteAdmin,
    getState,
    getGallery,
    toggleArtTradeState,
    toggleCommissionState,
    postImage,
    deleteImage,
    getCommission,
    getCommissionsWithStatus,
    postCommission,
    getFeatured,
    getImage
}