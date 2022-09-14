let play = document.getElementById("play");

let url = JSON.parse(localStorage.getItem("url"));

let div = document.createElement("div");

let img = document.createElement("iframe");
img.id="video"

img.allow="fullscreen";

img.src=url;
 


div.append(img);
play.append(div);



const searchYoutube = async ()=>
{

    try{
   
      let input = JSON.parse(localStorage.getItem("input"))||"";
      
      if(input=="")
      {
         input="Masai School";
      }
         
   let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=AIzaSyCI2x87bqeccTnRKP45MCL8HNDJjnvy_Yc&maxResults=20`);

    let data = await res.json()
    console.log(data);
    showResult(data.items)

}
    
catch(err)
{
 console.log("err",err);
}


}

searchYoutube();







// second search point
let result = document.getElementById("relatedVideo");

const showResult =(data) =>
{
   result.innerHTML=null;
//console.log(data[0].snippet.thumbnails.default.url);

data.forEach(({snippet, id:{videoId}}) =>
{
   
    try
    {
         
      
            let div = document.createElement("div");
            div.id="main";
            div.addEventListener("click",()=>
            {
                playVideo(videoId);
            })
             
            let subDiv1 = document.createElement("div");
            let subDiv2 = document.createElement("div");
            let iframe = document.createElement("img");
            iframe.id="Svideo"
            //iframe.src=`https://www.youtube.com/embed/${videoId}`;
            iframe.src=snippet.thumbnails.high.url;
            //console.log(ele.snippet.thumbnails.high.url)

            iframe.height="90%";
            iframe.width="90%";
            iframe.allow="fullscreen";

            let title = document.createElement("p");
            title.id="text";
            title.innerText=snippet.title;


            subDiv1.append(iframe);
            subDiv2.append(title);

            div.append(subDiv1,subDiv2);
            result.append(div);


    }
    catch(err)
    {
        console.log("err",err);
    }




});



}

function playVideo(id)
{

 let url =`https://www.youtube.com/embed/${id}`;

 localStorage.setItem("url",JSON.stringify(url));

 window.location.href="play.html";


}

