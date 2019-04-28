export function  solicitaraccesodispositivos() { 
    // controlvideo

    let dispositivos = {}
    let chunkssave =[]
    let constraintObj = {
        audio: true,
        video: {
            facingMode: 'user',

        }
    }
    let retornoinfo={
        mediaRecorder:{},
        chunks:[]
    }

    navigator.mediaDevices.getUserMedia(constraintObj).then(function(result){

        
        let multi =result
        if (multi === undefined) {
            alert('se requiere activar camara y audio')
        }

        
        dispositivos = multi
        let video = document.querySelector('video'); //controlvideo

        if ("srcObject" in video) {
            video.srcObject = dispositivos;
        } else {
            video.src = window.URL.createObjectURL(dispositivos);
        }

        let mediaRecorder = new MediaRecorder(dispositivos);
        mediaRecorder.ondataavailable = function (ev) {
            console.log(ev.data)
            chunkssave.push(ev.data);        
        }
        retornoinfo.chunks=chunkssave;
        retornoinfo.mediaRecorder=mediaRecorder;
        console.log("retorno",retornoinfo)
        return retornoinfo;
    })
    .catch(function (err) {
        console.log(err.name, err.message);
    });

}