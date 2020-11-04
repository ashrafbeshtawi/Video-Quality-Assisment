// the script should be included in the head


//main script loader
let tags =document.getElementsByClassName("vid");
  //add bootstrab
document.getElementsByTagName("head")[0].innerHTML+='<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">';
for (let i = 0; i < tags.length; i++) {
  let vid_id=tags[i].getAttribute("vid_id");
  let link=tags[i].getAttribute("link");
  let width=tags[i].getAttribute("width");
  let height=tags[i].getAttribute("height");
  //processing the poster
  let poster=tags[i].getAttribute("poster")==null?"":"poster="+tags[i].getAttribute("poster");

  
  add_video(null,vid_id,link,width,height,poster,tags[0]);
  
}


function add_video(parent_id,child_id,link,width,height,poster,pointer_parent) {
    // generate html5 code for video player
    let video_text='<br><div id="container'+child_id+'"><video  '+poster+' id="'+child_id+'" width="'+width+'" height="'+height+'" oldwidth="0" oldHeight="0"></video></div>';
    // add the video player
    let video=null;
    if(pointer_parent==null){
      video=add_to_element(parent_id,video_text,child_id,1,null);
    }else{
      video=add_to_element(null,video_text,child_id,1,pointer_parent);
    }

    // generate html5 code for link
    let source='<source src="'+link+'" type="video/mp4">';
    // add the link of the video to th player
    add_to_element(null,source,"temp",1,video);
    //add the begin of the table 
    let table_id="table"+child_id;
    let table='<table style="width:50%" class="dcf-table dcf-table-responsive dcf-table-bordered dcf-table-striped dcf-w-100%"><thead><tr id="'+table_id+'"></tr></thead></tbody></table>';
    if(pointer_parent==null){
      add_to_element(parent_id,table,table_id,1,null);
    }else{
      add_to_element(null,table,table_id,1,pointer_parent);
    }
    //add play button
    let temp="'"+child_id+"'";
    let play_button='<th scope="col"><div class="glyphicon glyphicon-play btn btn-info btn-lg" onclick="play('+temp+')">Play</div></th>';
    add_to_element(table_id,play_button,child_id+"play",1,null);

    //add result
    let result='<th scope="col"><b id="'+child_id+'result" class="results">State: Unwatched</p></th>';
    add_to_element(table_id,result,child_id+"reslt",1,null);

    //add video quality question
    let code='<th scope="col"><label > Rate the video quality:</label> <select id="'+child_id+'quality" name="'+child_id+'quality">     <option value="good">Good</option>     <option value="bad">Bad</option> </select></th>';
    add_to_element(table_id,code,child_id+"reslt",1,null);

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
    result.innerHTML="State: watched 	&#10003;";
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