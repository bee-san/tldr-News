// <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

// import jquery CDN
var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);
/*


function termFrequency(document){
    // document is an array of strings

    // we want to go through every unique word in document
    // find out how many times that word appears in document
    // and put it into a dictionary

    var dict = {};

    var unique_words = new Set(document);

    // loops through all unique words
    for (var i = 0; i <= unique_words.length - 1; i++){
        dict.push({
            key: unique_words[i],
            value: 0
        });
        // loops through all words in document
        for (var x = 0; x <= document.length -1; x++){
            if (unique_words[i] == document[x]){
                dict[unique_words[i]] = dict[unique_words[i]] + 1;
            }
        }
    }

    var returnDict = {}
    var documentLength = document.length;
    for (const [key, value] of Object.entries(object)) {
        returnDict.push({
            key: key,
            value: value / documentLength
        })
      }

    return dict;
}

// each document is a sentence
function inverseDocumentFrequency(documents){
    var TFDocuments = [];
    for (var i = 0, i <= documents.length - 1; i ++){
        TFDocuments[i] = termFrequency(documents[i]);
    }
}

console.log("this runs 1");
var textContent = $('.story-body__inner').contents();
console.log(textContent);
console.log("this runs"); */

var $article = $('.story-body').find('p').contents();
console.log($article);
