
let userInput = document.querySelector('.userInput');
let ul = document.querySelector('ul');
let infoText = document.querySelector('.infoText');

ul.style.display = 'none';
let audio;

function showUsers(data) {
    console.log(data);
    let last_phonetic = data[0].phonetics.length - 1;
    let last_meaning = data[0].meanings.length - 1;
    let last_definitions = data[0].meanings[last_meaning].definitions.length - 1;

    ul.style.display = 'block';
    audio = new Audio(  `${data[0].phonetics[last_phonetic].audio}`);

    document.querySelector('.details p').innerText = data[0].word;
    document.querySelector('span').innerText = `${data[0].meanings[last_meaning].partOfSpeech} | ${data[0].phonetics[last_phonetic].text}`;

    document.querySelector('.meaning').innerText = data[0].meanings[last_meaning].definitions[last_definitions].definition;

    let example = data[0].meanings[last_meaning].definitions[last_definitions].example;
    if (example == undefined) {
        document.querySelector('#Eg').style.display = 'none';

    } else {
        document.querySelector('#Eg').style.display = 'block';
        document.querySelector('.example').innerText = example;
    }
    let synonyms = data[0].meanings[last_meaning].synonyms[0];
    let synonyms_length = data[0].meanings[last_meaning].synonyms.length;
    if (synonyms == undefined) {
        document.querySelector('#Syn').style.display = 'none';

    } else {
        document.querySelector('.synonyms').innerHTML ="";
        document.querySelector('#Syn').style.display = 'block';
        for (let i=0; i < synonyms_length; i++) {
            let item = `<span onclick="search_synonyms('${data[0].meanings[last_meaning].synonyms[i]}')"> ${data[0].meanings[last_meaning].synonyms[i]}</span>`;
            document.querySelector('.synonyms').insertAdjacentHTML("beforeend", item);
        }
    }

}

function showWords(result, word) {
    if (result.title) {
        
        infoText.style.color = "red";
        infoText.innerHTML = ` <h7>No found for <b>${word}</b> </h7>`;
    } else {
        userInput.blur();
        infoText.style.color = "green";
        userInput.value = "";
        infoText.innerText = ` `;
        showUsers(result);
    }
}

function searchWord(word) {
    ul.style.display = 'none';
    infoText.style.color = "green";
    infoText.innerText = ` searching ${word}`;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(result => showWords(result, word))

}

userInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter' && e.target.value) {
        searchWord(e.target.value)
    }
})

userInput.addEventListener('focus', () => {

    ul.style.display = 'none';
    infoText.style.color = "#000";
    infoText.innerText = `Type English Text`;
})

document.querySelector('#play').addEventListener("click", ()=>{
   audio.play();
})

function search_synonyms(key){
   searchWord(key)
}