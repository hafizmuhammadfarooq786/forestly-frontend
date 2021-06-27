import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "react-share";

const ShareOnSocialMedia = ({ hideCard }) => {
  return (
    <div>
      <FacebookShareButton
        url={"https://www.google.com.pk/"}
        quote={"Hey this is my forest detials"}
        hashtag={["#forest"]}
        description={"Please have a look on my forest"}
        className="share-button"
        onClick={hideCard}
      >
        <FacebookIcon size={32} round style={{ marginRight: 8 }} />
        <h4 style={{ color: "#274B28" }}> Share on Facebook</h4>
      </FacebookShareButton>
      <TwitterShareButton
        title={"Hey this is my forest detials"}
        url={"https://www.google.com.pk/"}
        hashtags={[
          "forestly",
          "forest",
          "nature",
          "humanity",
          "communityforests",
          "climatesolution",
          "natural",
        ]}
        className="share-button"
        onClick={hideCard}
      >
        <TwitterIcon size={32} round style={{ marginRight: 8 }} />
        <h4 style={{ color: "#274B28" }}>Share on Twitter</h4>
      </TwitterShareButton>
      <LinkedinShareButton
        title={"Hey this is my forest detials"}
        url={"https://www.google.com.pk/"}
        className="share-button"
        summary={"Please have a look on my forest"}
        source={"Forest.ly"}
        onClick={hideCard}
      >
        <LinkedinIcon size={32} style={{ marginRight: 8, borderRadius: 8 }} />
        <h4 style={{ color: "#274B28" }}>Share on LinkedIn</h4>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareOnSocialMedia;
