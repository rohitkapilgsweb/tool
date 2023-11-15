const expressAsyncHandler = require("express-async-handler");
const MediaUpload = require("../modals/FileUploadSchema");

const FileUploadController = expressAsyncHandler(async (req, res) => {

    const {ClientId, PostId,fileUploadField, message} = req.body
    const {originalname} = req.file
try{
   if(!PostId){
    let employee = new MediaUpload({
        name: req.file.originalname ? req.file.originalname : null,
        ClientId: req.body.ClientId ? req.body.ClientId : null,
        PostId: req.body.PostId ? req.body.PostId : null,
        fileUploadField: req.file.filename ? req.file.filename : null,
        message: req.body.message ? req.body.message: null
        });
        const dataToSave = await employee.save();
    
        res.send(dataToSave);
        }else if(PostId){
            const datasends = await MediaUpload.findByIdAndUpdate({ ClientId: req.body.ClientId }, { PostId: req.body.PostId, message:req.body.message });
            res.status(200).send(datasends)
        }

}catch (error){
console.log(error)
res.send(error);
}

})
module.exports = { FileUploadController };