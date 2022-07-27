let captured_data=[]
let constraints={audio:true,video:false}
navigator.mediaDevices.getUserMedia(constraints).then(
    function(stream){
        var myrecorder=new MediaRecorder(stream,{"mimetype":"audio/mp4"});

        var play_button=document.getElementById('record');
        var stop_button=document.getElementById('stop');
        var download_button=document.getElementById('download');

        play_button.onclick=play_recorder;

        stop_button.onclick=stop_recorder;

        download_button.onclick=download;
        
        myrecorder.ondataavailable=(stream)=>captured_data.push(stream.data);         

        myrecorder.onstop=trigger_stop;
        
        
        
        
        
        function play_recorder(){

            myrecorder.start();
            document.getElementById('capturedaudio').setAttribute('style','display:none');
            console.log('started recording...')
            play_button.setAttribute('style','color:orange;');
            stop_button.setAttribute('style','color:black');
            download_button.setAttribute('style','color:black');
            

            download_button.disabled=true;
            play_button.setAttribute('display','none');
            download_button.classList.add( 'isdisabled' )
            gettimer('a')
        }
      
        
        function stop_recorder(){
            myrecorder.stop();
            console.log('stopped recording')
            stop_button.setAttribute('style','color:orange');
            play_button.setAttribute('style','color:black');
            download_button.setAttribute('style','color:black');
            document.getElementById('capturedaudio').setAttribute('style','display:block');
            // gettimer("1");
            clearInterval(window.ultimate);
            download_button.classList.remove( 'isdisabled' );

        }

 
        
        function download(){
            
            let download_audio=document.getElementById('capturedaudio').src;
            download_button.setAttribute('href',download_audio);
            download_button.setAttribute('style','color:orange;');
            
            

        }

     
        
      

     
        
        function trigger_stop(){
            create_the_processed_blob();
            download_button.disabled=false;

        }

        function create_the_processed_blob(){
                let processed_blob=new Blob(captured_data,{"type":"audio/mp4"});

                let recorded_audio=document.getElementById("capturedaudio");
                recorded_audio.controls = true;
                var audioURL = URL.createObjectURL(processed_blob);
                recorded_audio.src=audioURL;
                captured_data=[]


        }

   

        function gettimer(s){
            debugger

            let timer=document.getElementById('timer');
            var sec=0;
            let counter=0;
            let my_color=['cyan','black'];
            Number(sec)

            function blac(){
            timer.innerHTML=`<b>Recording secs:${sec=sec+1}</b>`;
            timer.setAttribute('style','background-color:' +my_color[sec%2==0?0:1]);

            counter=1;
            if(sec==15){
                stop_recorder();
            }
        }
        
          
            window.ultimate=setInterval(() => {
               
                
                blac();
         }, 1000);

         if(s=="1"){
            clearInterval(ultimate);
            console.log('correct')
         }

         

            

        }




        
    }
);



