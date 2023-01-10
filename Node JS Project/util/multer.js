import multer from "multer";
import path from "path";

const fileStorage = multer.diskStorage({
  // 저장 폴더 위치
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  //파일이름
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export default multer({
  storage: fileStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB 로 제한
  },
});
