import QRCode from 'qrcode';

const getQr = async (uuid) => {
	const str = `http://www.songjackson.com/barRemote/?uuid=${uuid.params.uuid}`;
	return await QRCode.toDataURL(str);
};

export default {
	getQr,
};
