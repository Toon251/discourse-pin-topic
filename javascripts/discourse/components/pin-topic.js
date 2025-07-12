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
    
    

    @computed
    get isMobile() {
      return /Mobi|Android/i.test(navigator.userAgent);
    }
  
    @computed
    get isLogin() {
        return this.checkLogin();
    }

    async checkLogin() {
        const response1 = await fetch(`/session/current.json`);
        const data1 = await response1.json();
        console.log(data1);
        if(data1.current_user){
            return true
        }else{
            return false
        }
    
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

        
          // Get
          /*const resp = await fetch(settings.url, 
            { 
              method: "GET",
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              } }
          );
          const respData = await resp.json();
          if(respData.success){
            this.polls = respData.data;
          }*/

          
          

        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
}