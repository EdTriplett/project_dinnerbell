const router = require("express").Router();
const User = require("../models/User");
const FileUploader = require("../util/upload");

const allowed = (req, res, next) => {
  if (req.isAuthenticated() && req.session.user.id === req.params.id) {
    next();
  }
  res.json({ error: "unauthorized user action" });
};

router.get("/", async (req, res, next) => {
  try {
    res.json(await User.find({ public: true }));
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await User.findById(id));
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", allowed, async (req, res, next) => {
  try {
    const { user } = req.body;
    const updated = await req.session.user.update(user);
    req.session.user = updated;
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", allowed, async (req, res, next) => {
  try {
    req.session.user.remove();
    req.logout();
  } catch (error) {
    next(error);
  }
});

const uploadMw = FileUploader.single("photo");
router.post("/picture", allowed, uploadMw, async (req, res, next) => {
  try {
    const file = {
      data: req.file.buffer,
      name: req.file.originalname,
      mimetype: req.file.mimetype
    };
    const picture = await FileUploader.upload(file, req.session.user);
    req.session.user.update({ profilePicture: picture });
    res.json(picture);
  } catch (error) {
    next(error);
  }
});

router.delete("/picture", allowed, async (req, res, next) => {
  try {
    const picture = Picture.findById(req.session.user.profilePicture);
    await FileUploader.remove(picture.key);
    res.json({ deleted: picture });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
