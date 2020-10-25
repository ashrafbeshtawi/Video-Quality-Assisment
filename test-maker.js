// the script should be included in the head
// this script need bootstrab to be also included in the html file


function add_video(parent_id,child_id,link,width,height) {
    // generate html5 code for video player
    let video_text='<br><div id="container'+child_id+'"><video id="'+child_id+'" width="'+width+'" height="'+height+'" oldwidth="0" oldHeight="0"></video></div>';
    // add the video player
    let video=add_to_element(parent_id,video_text,child_id,1,null);
    // generate html5 code for link
    let source='<source src="'+link+'" type="video/mp4">';
    // add the link of the video to th player
    add_to_element(null,source,"temp",1,video);
    //add play button
    let temp="'"+child_id+"'";
    let play_button='<br><button  onclick="play('+temp+')">Play</button>';
    add_to_element(parent_id,play_button,child_id+"play",1,null);
    //add result
    let result='<br><b id="'+child_id+'result" class="results">This video was not watched yet</p>';
    add_to_element(parent_id,result,child_id+"reslt",1,null);
    //add video quality question
    let code='<label > Rate the video quality:</label> <select id="'+child_id+'quality" name="'+child_id+'quality">     <option value="good">Good</option>     <option value="bad">Bad</option> </select>';
    add_to_element(parent_id,code,child_id+"reslt",1,null);
    document.getElementById(child_id+"quality").disabled = true;

    //add listner to mange video result
    //add_end_video_listner(child_id)



}


// adding element to html element and return parent or child 
// it is possible to use id or give a pointer for selection of parent
// return_type=1 --> return child
// return_type!=1 ---> return parent
function add_to_element(id,element,element_id,return_type,pointer) {
    //selecting the parent
    let my_element=null;
    if(id==null){
        my_element=pointer
    }else{
        my_element=document.getElementById(id);
    }

    // adding the child
    my_element.innerHTML+=element;
    // if return child then return the child 
    if(return_type==1){
        my_element=document.getElementById(element_id);
        return my_element;
    }else{
    // return parent
    return my_element;

    }
}


function play(id) {
    //select he video
    let video=document.getElementById(id);
    //select the parent
    let parent=video.parentNode;
    //function to handle if the fullscreen mode was closed
    let caller= function (e){ fullscreen_closed(e,video,caller) }
    
    //function to handle if the video was finished

    let end_play= function (e){ change_video_result(id,end_play) }
    video.addEventListener("ended", end_play);
    //start fullscreen mode & set eventlistner to halde if the fullscreen mode closed
    if (parent.requestFullscreen) {
        parent.requestFullscreen();
        parent.addEventListener("fullscreenchange",caller)
      } else if (parent.msRequestFullscreen) {
        parent.msRequestFullscreen();
        parent.addEventListener("onmsfullscreenchange",caller)
      } else if (parent.mozRequestFullScreen) {
        parent.mozRequestFullScreen();
        parent.addEventListener("mozfullscreenchange",caller)
      } else if (parent.webkitRequestFullscreen) {
        parent.webkitRequestFullscreen();
        parent.addEventListener("webkitfullscreenchange",caller)
      }
    // change width and height to fullscreen
    let oldH=video.getAttribute("height");
    let oldW=video.getAttribute("width");
    let fullW=screen.width;
    let fullH=screen.height;
    //change height and weight
    video.setAttribute("oldwidth",oldW);
    video.setAttribute("oldheight",oldH);
    video.setAttribute("width",fullW);
    video.setAttribute("height",fullH);
    //start the video
    video.play();
    
}

// automaticly called if the fullscreen mode was closed
function fullscreen_closed(e,video,caller){
    //if fullscreen mode closed then
    if (
        !document.fullscreenElement && /* Standard syntax */
        !document.webkitFullscreenElement && /* Chrome, Safari and Opera syntax */
        !document.mozFullScreenElement &&/* Firefox syntax */
        !document.msFullscreenElement /* IE/Edge syntax */
      ) {
        //reload video
        video.load();
        //restore the old height and weight
        let oldH=video.getAttribute("oldheight");
        let oldW=video.getAttribute("oldwidth");

        video.setAttribute("width",oldW);
        video.setAttribute("height",oldH);
        video.setAttribute("oldwidth",0);
        video.setAttribute("oldheight",0);
      //remove the eventlistner of the fullscreen mode
        let parent=video.parentNode;
    if (parent.requestFullscreen) {
        parent.removeEventListener("fullscreenchange",caller)
      } else if (parent.msRequestFullscreen) {
        parent.removeEventListener("onmsfullscreenchange",caller)
      } else if (parent.mozRequestFullScreen) {
        parent.removeEventListener("mozfullscreenchange",caller)
      } else if (parent.webkitRequestFullscreen) {
        parent.removeEventListener("webkitfullscreenchange",caller)
      }
    
      //alert("the video must be watched in fullscreen mode");


      }
}

/*
function close_fullscreen(video){

}
*/


function change_video_result(id,end_play) {
  console.log("change state of"+id);
  //select elements
  let video=document.getElementById(id);
  let result=document.getElementById(id+"result");
  let option=document.getElementById(id+"quality");
  //set video as watched
    result.innerHTML="Video watched :)";
  // let user rate the video
    option.disabled=false;
    // exit fullscreen
    document.exitFullscreen();
    // remove the event listner
    video.removeEventListener("ended",end_play);
}

/*
function add_end_video_listner(id){
    
    let video=document.getElementById(id);
    let result=document.getElementById(id+"result");
    console.log("adding listner to"+ id);
    video.addEventListener("ended",function end_play(e) {
        change_video_result(result);
    })


}

*/