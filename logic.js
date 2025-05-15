//
// function fetchUserProfile(username){
//     fetch(`https://api.github.com/users/${username}`).then((raw)=>raw.json());
// }
// fetchUserProfile("async").then((data)=>{
//     console.log(data);
    
// })
// repos
// function getUserRepos(username){
//     return fetch(`https://api.github.com/users/${username}/repos`)
// .then((raw)=>raw.json());

// }getUserRepos("asynchronousJavascriptor").then((data)=>{
//     console.log(data);
    
// })

let searchbtn=document.querySelector(".search");
let usernameinp=document.querySelector(".usernameinp");
let card =document.querySelector(".card");

function getProfileData(username){
    return fetch(`https://api.github.com/users/${username}`)
    .then(raw =>{
        // console.log(raw);
        if(!raw.ok) throw new Error("user not found")
        return raw.json();
    });
}
function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(raw =>{
        // console.log(raw);
        if(!raw.ok) throw new Error("Failed to fetch repository.")
        return raw.json();
    }); 
}
function decorateProfileData(details){
    console.log(details);
    
  let data=  `<img src="${details.avatar_url}" alt="User Avatar"
        class="w-32 h-32 rounded-full border-4 border-white shadow-md"/>

      <!-- Info Section -->
      <div class="flex-1">
        <div class="mb-2">
          <h2 class="text-2xl font-bold text-gray-800">${details.name}</h2>
          <p class="text-gray-500 text-sm">${details.login}</p>
        </div>
        <p class="text-gray-700 mb-4">
        ${details.bio? details.bio:""} 
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p class="font-semibold text-gray-800">${details.public_repos}</p>
            <p class="text-gray-500">Public Repos</p>
          </div>
          <div>
            <p class="font-semibold text-gray-800">${details.followers}</p>
            <p class="text-gray-500">Followers</p>
          </div>
          <div>
            <p class="font-semibold text-gray-800">${details.following}</p>
            <p class="text-gray-500">Following</p>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-6 space-y-2 text-sm text-gray-600">
          <p><strong>Location:</strong> ${details.location}</p>
          <p><strong>Company:</strong> ${details.company? details.company:""}</p>
          <p><strong>Blog:</strong> <a href="#" target="_blank" class="text-blue-600 hover:underline">${details.blog}</a></p>
        </div>
      </div>`;
      card.innerHTML=data;
}



searchbtn.addEventListener("click",function(){
  let username =usernameinp.value.trim();
  if(username.length > 0){
    getProfileData(username).then((data)=>{
        decorateProfileData(data);
        
    })
  }
  else{
    alert();
  }
});