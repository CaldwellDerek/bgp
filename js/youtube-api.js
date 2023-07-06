      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          playerVars: {
            playsinline: 1,
            rel: 0
          }
        });
      }

      function stopVideo() {
        player.stopVideo();
      }