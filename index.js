const fs = require('fs');
const {google} = require('googleapis');

const KEYFILEPATH = './trikon-backend-c02e59befb2d.json';

const SCOPES = ['https://www.googleapis.com/auth/drive'];



const auth  =  new google.auth.GoogleAuth(
    {
        keyFile: KEYFILEPATH,
        scopes:SCOPES
    }
)
const folder1 = '1b15AmdWW9eTsiKZzIofWXRQLZeLh_BtP';

async function createAndUploadFile(auth){

    const driveService = google.drive({version:'v3',auth});

    let fileMetaData = {
        'name':'pic1.jgp',
        'parents':[folder1]
    }

    let media = {
        MimeTypeArray: 'image/jpg',
        body:fs.createReadStream('./pic2.jpg')
    }

    let response = await  driveService.files.create({
        resource: fileMetaData,
        media: media,
        fields:'id'
    })
    switch (response.status) {
        case 200:
            console.log('file created id:' + response.data.id);
            break;
    
        default:
            console.log('Error'+response.errors);
            break;
    }
}

createAndUploadFile(auth).catch(console.error);


//get
//https://drive.google.com/uc?exports=view&id=1LmhCtB1_nCRFHFRUC3UweZ6fkIoIrE7B