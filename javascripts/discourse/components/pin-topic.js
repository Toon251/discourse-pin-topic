import Component from "@glimmer/component";
import { computed, action } from '@ember/object';
import { service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class LatestPoll extends Component {
    @service router;
    @tracked polls = [];
    @tracked pollImg = "";
    @tracked title = "";
    @tracked show = false;
    @tracked login = false;
    @tracked fancy_title = "";
    @tracked cooked = "";
    
    

    @computed
    get isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  
    

    async checkLogin() {
        try {
            const response = await fetch(`/session/current.json`);
            
            // Check specifically for 404 error
            if (response.status === 404) {
                console.error('Endpoint not found (404)');
                this.login = false;
                return false;
            }
            
            // Check for other HTTP errors
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                this.login = false;
                return false;
            }
            
            const data = await response.json();
            console.log('Session data:', data);
            
            if (data.current_user) {
                return true;
            } else {
                return false;
            }
            
        } catch (error) {
            console.error('Login check error:', error);
            return false;
        }
    
    }

    async getTopic(topicId) {
        const response = await fetch(`/t/${topicId}.json`);
        const data = await response.json();
        this.fancy_title = data.fancy_title;
        this.cooked = data.post_stream.posts[0].cooked;

    }

    constructor() {
        super(...arguments);
        this.loadEvents(); 
        
    }

    get showOnRoute() {
      const path = this.router.currentURL;
      //console.log(path)

      if (settings.url_must_contain.length) {
        const allowedPaths = settings.url_must_contain.split("|");
        //console.log(allowedPaths)
        return allowedPaths.some((allowedPath) => {
          //console.log("allowedPath ", allowedPath)
          if (allowedPath.slice(-1) === "*") {
            return path.indexOf(allowedPath.slice(0, -1)) === 0;
          }
          return path === allowedPath;
        });
      }
    }


    async loadEvents() {
        try {

          /*const path = this.router.currentURL;

          
          const response1 = await fetch(`/session/current.json`);
          const data1 = await response1.json();
          console.log(data1)*/
          //username = data1.current_user.username


          //this.pollImg = settings.poll_img;
          this.title = settings.title;

          this.login = this.checkLogin();
        
          if(settings.topic_id !== 0){
            this.getTopic(settings.topic_id);
          }
          



          
          

        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}