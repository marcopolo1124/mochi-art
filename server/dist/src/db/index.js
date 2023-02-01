"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const site_1 = require("./site");
const commissions_1 = require("./commissions");
exports.default = {
    getAdminByUsername: admin_1.getAdminByUsername,
    postAdmin: admin_1.postAdmin,
    updateAdminPassword: admin_1.updateAdminPassword,
    deleteAdmin: admin_1.deleteAdmin,
    getState: site_1.getState,
    getGallery: site_1.getGallery,
    toggleState: site_1.toggleState,
    postImage: site_1.postImage,
    deleteImage: site_1.deleteImage,
    getCommission: commissions_1.getCommission,
    getCommissionsWithStatus: commissions_1.getCommissionsWithStatus,
    postCommission: commissions_1.postCommission
};
