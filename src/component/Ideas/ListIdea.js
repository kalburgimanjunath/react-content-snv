import React, { useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
export const readText = function (text, voicetype = 83, lang) {
  let timer = null;
  let reading = false;
  if (!reading) {
    speechSynthesis.cancel();
    if (timer) {
      clearInterval(timer);
    }
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();

    msg.voice = voices[voicetype];
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    // msg.lang = 'en-US';
    msg.lang = lang;
    console.log(lang);

    msg.onerror = function (e) {
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);
    };

    msg.onpause = function (e) {
      console.log('onpause in ' + e.elapsedTime + ' seconds.');
    };

    msg.onend = function (e) {
      // console.log('onend in ' + e.elapsedTime + ' seconds.');
      reading = false;
      clearInterval(timer);
    };

    speechSynthesis.onerror = function (e) {
      console.log('speechSynthesis onerror in ' + e.elapsedTime + ' seconds.');
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);
    };

    speechSynthesis.speak(msg);

    timer = setInterval(function () {
      if (speechSynthesis.paused) {
        console.log('#continue');
        speechSynthesis.resume();
      }
    }, 100);

    reading = true;
  }
};
export default function ListIdea({ ideas }) {
  let count = 0;
  const [languages, setLanguages] = useState([
    { language: 'English', code: 'en-us' },
    { language: 'kannada', code: 'kn-In' },
  ]);
  let voices = window.speechSynthesis.getVoices();

  const [selLanguage, setSelLanguage] = useState('en-us');
  const [voice, setVoice] = useState([
    { voice: 'Male', code: '1' },
    { voice: 'Female', code: '2' },
  ]);
  const [selVoice, setSelVoice] = useState(1);
  const onSelChange = (e) => {
    console.log(e.target.value);
    setSelLanguage(e.target.value);
  };
  const onSelVoiceChange = (e) => {
    console.log(e.target.value);
    setSelVoice(e.target.value);
  };
  return (
    <div className="ideas-list">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <select id="voiceSelect" onChange={onSelChange}>
          {voices &&
            voices.length > 0 &&
            voices.map((lang, key) => {
              return (
                <option key={lang.lang} value={lang.lang}>
                  {lang.name}
                </option>
              );
            })}
        </select>
        <select id="voice" onChange={onSelVoiceChange}>
          {voice &&
            voice.length > 0 &&
            voice.map((lang, key) => {
              return (
                <option key={lang.voice} value={lang.code}>
                  {lang.voice}
                </option>
              );
            })}
        </select>
      </div>
      <ListGroup>
        {ideas &&
          ideas.map((item) => {
            count++;
            let rowclass = count % 5 == 0 ? 'even' : 'odd';
            return (
              <>
                <ListGroupItem
                  key={item.id}
                  className={rowclass == 'even' ? 'active' : ''}
                >
                  <ListGroupItemHeading>
                    {item.fields['title']}
                    <button
                      onClick={() =>
                        readText(
                          item.fields['description'],
                          selVoice,
                          selLanguage
                        )
                      }
                    >
                      Play
                    </button>
                  </ListGroupItemHeading>
                  <ListGroupItemText>
                    {item.fields['description']}
                  </ListGroupItemText>
                </ListGroupItem>
              </>
            );
          })}
      </ListGroup>
    </div>
  );
}
