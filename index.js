

// LINK TO CHECK API IS ON OR NOT :https://console.cloud.google.com/apis/api/youtube.googleapis.com/overview?project=dictionary-84ef0
  
   // API KEY : AIzaSyD3iXFH76zzaI8kPvBVLxlV1ukSNrD83xU

//let api_key ="AIzaSyD3iXFH76zzaI8kPvBVLxlV1ukSNrD83xU";
//let max = 10;
//let search="Future Millionaires Academy";



const searchYoutube = async ()=>
{

    try{
      let input = document.getElementById("search").value;
      
       
      localStorage.setItem("input",JSON.stringify(input));

     console.log(input);
         
   let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=AIzaSyCI2x87bqeccTnRKP45MCL8HNDJjnvy_Yc&maxResults=50`);

    let data = await res.json()
    console.log(data);
    showResult(data.items)

}
    
catch(err)
{
 console.log("err",err);
}


}

//searchYoutube();


const mostPopular = async () =>
{

     try{

           let res = await fetch(`https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCI2x87bqeccTnRKP45MCL8HNDJjnvy_Yc&part=snippet&maxResults=50`)

           let mostData = await res.json()
           let input ="most popular videos in india";
           localStorage.setItem("input",JSON.stringify(input));

           //console.log(mostData);
           showResult(mostData.items)
           //return mostData.items;

     }
     catch(err)
     {
         console.log("err",err);
     }

}


mostPopular();







// second search point
let result = document.getElementById("result");

const showResult =(data) =>
{
   result.innerHTML=null;
   getData.style.display="none";
//console.log(data[0].snippet.thumbnails.default.url);

data.forEach(({snippet, id:{videoId}}) =>
{
   
    try
    {
         
      
            let div = document.createElement("div");
            div.addEventListener("click",()=>
            {
                playVideo(videoId);
            })

            let iframe = document.createElement("img");
            iframe.id="video"
            //iframe.src=`https://www.youtube.com/embed/${videoId}`;
            iframe.src=snippet.thumbnails.high.url;

            iframe.height="90%";
            iframe.width="90%";
            iframe.allow="fullscreen";

            let channel=document.createElement("p");
            channel.innerText=snippet.channelTitle;
            channel.id="channel";

            let title = document.createElement("p");
            title.id="text";
            title.innerText=snippet.title;


            div.append(iframe,title,channel);
            result.append(div);


    }
    catch(err)
    {
        console.log("err",err);
    }




});


 

}




// for data on seach



const searchResult = async ()=>
{

    try{
      let input = document.getElementById("search").value;
      
      localStorage.setItem("input",JSON.stringify(input));

     //console.log(input);
         
   let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${input}&key=AIzaSyCI2x87bqeccTnRKP45MCL8HNDJjnvy_Yc&maxResults=20`);

    let data = await res.json()
    console.log(data);
    searchData(data.items)

}
    
catch(err)
{
 console.log("err",err);
}


}



let getData = document.getElementById("searchDiv");

function searchData(data)
{
   getData.innerHTML=null;
   getData.style.display="block";
//console.log(data[0].snippet.thumbnails.default.url);


for(let i=0;i<data.length;i++)
{

     let div = document.createElement("div");
     div.addEventListener("click",()=>
            {
                playVideo(data[i].id.videoId);
            })
     let title = document.createElement("p");
     title.innerText=data[i].snippet.title;



    

     div.append(title);
     getData.append(div);
}
}



function playVideo(id)
{

 let url =`https://www.youtube.com/embed/${id}`;

 localStorage.setItem("url",JSON.stringify(url));

 window.location.href="play.html";


}



document.getElementById("bar").addEventListener("click",fun);

let flag=true;
function fun()
{
    if(flag==true)
    {

         let small = document.getElementById("smallDiv");
         small.style.display="block";
    let left = document.getElementById("leftFilter");
    left.style.display="none";

    let right = document.getElementById("rightContainer");
    right.style.width="85%";
    let result = document.getElementById("result");
        result.style.display="grid";
        result.style.gridTemplateColumns="repeat(5,22%)";
       // result.style.gridTemplateRows="repeat(5,1fr)";
        


    flag=false;
    }
    else if(flag==false)
    {
        let small = document.getElementById("smallDiv");
        small.style.display="none";
        let left = document.getElementById("leftFilter");
        left.style.display="block";
    
        let right = document.getElementById("rightContainer");
        right.style.width="80%";
        let result = document.getElementById("result");
        result.style.display="grid";
        result.style.gridTemplateColumns="repeat(4,1fr)";
        
        flag=true;

    }

}