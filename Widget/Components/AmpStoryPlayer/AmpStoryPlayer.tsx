import WebView from "react-native-webview";
import { View } from "react-native";
import { AmpStoryPlayerPropTypes } from "./types";
import { styles } from "./AmpStoryPlayer.styles";

const AmpStoryPlayer = ({ storyHref, onClose }: AmpStoryPlayerPropTypes) => {
  const markup = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://cdn.ampproject.org/amp-story-player-v0.js"></script>
        <link href="https://cdn.ampproject.org/amp-story-player-v0.css" rel="stylesheet" type="text/css" />
        <style>
          body, html, #amp-story-container {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          amp-story-player {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="amp-story-container">
          <amp-story-player>
            <script type="application/json">
              {
                "behavior": {
                  "autoplay": true
                },
                "controls": [{"name": "close", "position": "start"}]
              }
            </script>
            <a href="${storyHref}"></a>
          </amp-story-player>
        </div>
        <script>
            const player = document.querySelector('amp-story-player')
            player.addEventListener('amp-story-player-close', function() {
                window.ReactNativeWebView.postMessage('close');
            });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: markup }}
        style={styles.webView}
        onMessage={(event) => {
          if (event.nativeEvent.data === "close") {
            onClose();
          }
        }}
      />
    </View>
  );
};

export default AmpStoryPlayer;
