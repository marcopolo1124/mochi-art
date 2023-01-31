import { getAdminByUsername, postAdmin, updateAdminPassword, deleteAdmin} from "./admin";
import {getState, getGallery, toggleState, postImage, deleteImage} from './site'
import { getCommission, getCommissionsWithStatus, postCommission } from "./commissions";

export default {
    getAdminByUsername,
    postAdmin,
    updateAdminPassword,
    deleteAdmin,
    getState,
    getGallery,
    toggleState,
    postImage,
    deleteImage,
    getCommission,
    getCommissionsWithStatus,
    postCommission
}