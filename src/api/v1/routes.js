const { Router } = require("express");
const { generateQRCode, logQRCode } = require("../../utils/qr_code");
const { prisma } = require("../../../prisma");
const { config } = require("../../config");
const router = Router();
router.post("/create/qr-code", async (req, res) => {
  const { value } = req.body;
  const data = await prisma.tbl_qr_code.create({
    data: {
      value: value,
    },
  });
  const qrcodeData = { value: data.value, secret: config.secret };
  const q = await generateQRCode(qrcodeData);

  logQRCode(qrcodeData);
  res.send({
    success: true,
    message: "QR Code generated successfully",
    data: q,
  });
});

router.get("/get/qr-code", async (req, res) => {
  const data = await prisma.tbl_qr_code.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send({
    success: true,
    message: "QR Code found successfully",
    data: data,
  });
});

router.get("/get/by-id", async (req, res) => {
  const { id } = req.query;

  const data = await prisma.tbl_qr_code.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!data) {
    res.status(404).send({
      success: false,
      message: "QR Code not found",
    });
  }
  const qrcodeData = { value: data.value, secret: config.secret };
  const q = await generateQRCode(qrcodeData);
  logQRCode(qrcodeData)
  res.send({
    success: true,
    message: "QR Code found successfully",
    data: q,
  });
});

module.exports = router;
