
function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories))
}
function removeActiveClass(){
  const activeButtons= document.getElementsByClassName('active')
  for(let btn of activeButtons)
  {
    btn.classList.remove('active')
  }
  console.log(activeButtons)
}

const showLoader=()=>{
  document.getElementById('loading-video').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}

function displayVideo(searchText= "")
{   
    //  showLoader()

    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(response=>response.json())
    .then(data=>
      { removeActiveClass()
        document.getElementById('btn-all').classList.add('active')
        displayVideos(data.videos)})
}
const loadCategoryVideo=(id)=>{
 
  const url=`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(data=>
    {  const clickButton=document.getElementById(`btn-${id}`)
         removeActiveClass()
      clickButton.classList.add('active')
      displayVideos(data.category)})
} 
const loadVideoDetails=(videoId)=>{
  console.log(videoId)
  const url=`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
  .then(res=>res.json())
  .then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails=(video)=>{
  document.getElementById('video_detalis').showModal()
  const detalisContainer=document.getElementById('detalis_container')
   detalisContainer.innerHTML=`<div class="card bg-primary text-primary-content ">
  <div class="card-body">
    <h2 class="card-title">${video.others}</h2>
    <p>${video.description}</p>
    
    </div>
  </div>
</div>`
console.log(video)
}

const displayVideos=(video)=>{
 const videoContainer=document.getElementById('video-container')
    videoContainer.innerHTML=" "
    if(video.length==0)
    {
      videoContainer.innerHTML=`  <div
        class="col-span-full flex flex-col justify-center items-center my-[200px]"
      >
        <img class="w-[120px]" src="Icon.png" alt="icon" />
        <p class="text-2xl font-bold text-center">
          Oops!! Sorry, There is no content here
        </p>
      </div>`
      return;
    }

    video.forEach((videos)=>{
         const videoCard =document.createElement('div')
    videoCard.innerHTML=`<div class="card bg-base-100 shadow-sm ">
  <figure>
    <img  class="h-[250px] w-full object-cover"
      src="${videos.thumbnail}"
      alt="Shoes" />
  </figure>
   <div class="mt-5 flex gap-5">
          <!-- man pic -->
          <div class="avatar h-14 w-14">
            <div
              class="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2"
            >
              <img
                src="${videos.authors[0].profile_picture}"
              />
            </div>
          </div>
          <!-- text body -->
          <div>
          <h2 class="font-bold text-2xl">${videos.title}</h2>
            <p class="text-gray-400 inline-flex">
              ${videos.authors[0].profile_name} 
              ${videos.authors[0].verified==true?`<img class="w-7 h-7"
                src="https://img.icons8.com/?size=64&id=eZo3c88c63il&format=png"
                alt=""
              />`:''}
              
           </p>
            <p class="text-gray-400">${videos.others.views}</p>
          </div>
            
          </div>
          <button  onclick="loadVideoDetails('${videos.video_id}')" class="btn btn-block">Show More</button>

</div>`
    videoContainer.appendChild(videoCard)


    })   

   
}

function displayCategories(categories){
    // get the container
    const categoryContainer=document.getElementById('category-container')
    //loop operation on array of object
    for(let cat of categories)
    {
        //create element 
        const categoryDiv=document.createElement('div')
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}"  onclick=" loadCategoryVideo(${cat.category_id})" class="btn btn-sm hover:bg-red-500 hover:text-white">${cat.category}</button>
        `
        //append the element
        categoryContainer.appendChild(categoryDiv)
    
    
    }
}
document.getElementById('search-input').addEventListener('keyup',(e)=>{
  const input=e.target.value;
   displayVideo(input)
  console.log(input)
})
loadCategories()
