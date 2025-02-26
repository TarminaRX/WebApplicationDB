import { PostBlock } from './components/blocks.js';
import { AsideBlock } from './components/navigation.js';
import { BASE_URL_SITE } from './globals.js';
import { default as axios } from './libs/axios.min.js';
import van from './libs/van-1.5.3.min.js';

/**
 * @param {string} urlStr
 */
export const GetLandingBlock = (urlStr) => {
  if (urlStr.includes("landing")) {
    const mainDiv = document.getElementById("mainContainer");
    const childMainDiv = mainDiv.children;
    const savedNodes = Array.from(childMainDiv);
    mainDiv.innerHTML = '';
    van.add(mainDiv, AsideBlock("username", "home"));

    for (let i = 0; i < savedNodes.length; i++) {
      //console.log(savedNodes[i]);
      //console.log(savedNodes[i].nodeName === "MAIN");
      mainDiv.appendChild(savedNodes[i]);
    }

    const postFeedCon = document.getElementById("postFeedCont");
    //van.add(postFeedCon, PostBlock("Test User", "test message"));

    axios.post(BASE_URL_SITE + "/api/feed", {}, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {

      /** @type {FeedContents[]} */
      const messagesReceive = response.data;
      for (let i = 0; i < messagesReceive.length; i++) {
        van.add(postFeedCon, PostBlock(messagesReceive[i].user_name, messagesReceive[i].post));
      }
    }).catch((err) => {
      console.log(err);
    });

  }
}

