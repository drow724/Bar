import qrService from '../../service/qr/QrService.js';

const getQr = async (uuid) => {
	return await qrService.getQr(uuid);
};

export default {
	getQr,
};
