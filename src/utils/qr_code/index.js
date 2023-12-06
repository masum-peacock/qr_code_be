const QRCode = require("qrcode");

exports.generateQRCode = async (data) => {
  const stringData = JSON.stringify(data);
  let base64;
  const code = await QRCode.toDataURL(stringData);
  return base64 = code;
};
exports.logQRCode = (data) => {
  const stringData = JSON.stringify(data);
  QRCode.toString(stringData, { type: "terminal" }, function (err, QRcode) {
    if (err) return console.log("error occurred");
    console.log(QRcode);
  });
};
