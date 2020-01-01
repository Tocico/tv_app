import axios from 'axios'

export async function load(){
    const allVideo = await getData();
    return allVideo;
}

export async function getVideo(name){
    async function fetchData(){
        const response = await axios(`https://api.tvmaze.com/singlesearch/shows?q=${name}&embed=episodes`)
        .catch(error => {return error})
        if(response.status === 200){
            const tvShowItem = response.data;
            return tvShowItem;
        }
        
    }

    const tvShowItem = await fetchData();

    console.log(tvShowItem)
    return tvShowItem;

}

async function getData(){

    async function fetchImage(){
        let num = 1 + Math.floor(Math.random() * 1000);
        const response = await axios (`http://api.tvmaze.com/shows/${num}`);
         if(response.status === 200){
             let image = response.data.image.original;
             return image;
            }
    }

 

    const image = await fetchImage();
    if(!image) return Error;

    return {image};

}

