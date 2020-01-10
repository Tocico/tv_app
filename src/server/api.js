import axios from 'axios'

export async function load(){
    const tvShow = await getOneImage();
    const tvShowList = await getTvShow();
    return { tvShow , tvShowList };
}


export async function getVideo(query){
    async function fetchData(){
        const response = await axios(`http://api.tvmaze.com/shows/${query}?embed=episodes`)
        return response.data;
    }

    const tvShowItem = await fetchData();
    return { tvShowItem };
}


export async function searchTvShow(name){
    async function fetchData(){
        const response = await axios(`https://api.tvmaze.com//search/shows?q=${name}`)
            const errorMsg = 'no show'
            const searchTvShow = response.data;
            if(searchTvShow.length === 0){
                return errorMsg;
            }
            return searchTvShow;
    }

    const searchTvShow = await fetchData();
    return { searchTvShow };

}

async function getTvShow(){
    async function fetchTvShow(){
        const response = await axios(`http://api.tvmaze.com/shows`);
            return response.data;
    }

    const tvShowList = await fetchTvShow();
    
    let randoms = [];
    let showList = [];
    while(showList.length < 60){
        let id =  Math.floor(Math.random() * 240);
        if(!randoms.includes(id)){
            randoms.push(id);
            showList.push(tvShowList[id]);
        }
    }
    return { showList }
}

async function getOneImage(){

    async function fetchImage(){
        let num = 1 + Math.floor(Math.random() * 1000);
        const response = await axios (`http://api.tvmaze.com/shows/${num}`);
             return response.data;
    }

    const  oneTvShow= await fetchImage();
    const tvName = oneTvShow.name;
    const oneImage = oneTvShow.image.original;
    const summary = oneTvShow.summary;
    const tvShowId = oneTvShow.id;

    return { tvName, oneImage, summary, tvShowId };

}

