export default class TweetService {
  constructor(http,tokenStorage,socket) {
    this.http=http;
    this.tokenStorage=tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    console.log('username: ', username);
    let query = username ? `?username=${username}` : '';
    console.log(query);
    if (query!==''){
      console.log("여기실행");
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      headers: this.getHeaders()
    });} else {
      console.log("여기는실행되면 안돼")
      return this.http.fetch(`/tweets/`, {
        method: 'GET',
        headers: this.getHeaders()
      });
    }
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets/`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        text
      }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders(){
    const token = this.tokenStorage.getToken();
    return{
      Authorization:`Bearer ${token}`,
    }
  }

  onSync(callback){
    return this.socket.onSync('tweets', callback)
  }
}