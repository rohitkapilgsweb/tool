const expressAsyncHandler = require("express-async-handler");
const MediaUpload = require("../modals/FileUploadSchema");

const FileUploadController = expressAsyncHandler(async (req, res) => {

    const {ClientId, PostId,fileUploadField} = req.body
    const {originalname} = req.file
    console.log(req)
try{
   console.log(req.file.originalname)
   if(!PostId){
    let employee = new MediaUpload({
        name: req.file.originalname ? req.file.originalname : null,
        ClientId: req.body.ClientId ? req.body.ClientId : null,
        PostId: req.body.PostId ? req.body.PostId : null,
        fileUploadField: req.file.filename ? req.file.filename : null
        });
        const dataToSave = await employee.save();
    
        res.send(dataToSave);
        }else if(PostId){
            const datasends = await MediaUpload.findByIdAndUpdate({ ClientId: req.body.ClientId }, { PostId: req.body.PostId});
            res.status(200).send(datasends)
        }

}catch (error){
console.log(error)
res.send(error);
}

})
module.exports = { FileUploadController };