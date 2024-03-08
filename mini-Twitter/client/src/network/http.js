export default class HttpClient {
    constructor(baseURL){
        this.baseURL=baseURL;
    }

    //url: 인자로 전달받는 나머지 경로
    async fetch(url,options){
        const response = await fetch(`${this.baseURL}${url}`,{
            ...options, //인자로 받은것을 그대로 복사
            headers:{
                'Content-Type':'application/json',
                ...options.headers
            }
        });

        let data;


         try{
            if(options.method !=='DELETE'){
                data = await response.json();
            }
            
         } catch(error){
            //response에 body가 없는 경우
            console.error(error);
         }


         if(response.status> 299 || response.status<200){
            const message = data && data.message ? data.message : 'Sommething went wrong!'
            throw new Error(message);
         }

         return data;
    }

   

}