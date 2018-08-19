// <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

// import jquery CDN
var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);



function termFrequency(document){

    // document is an array of strings

    // we want to go through every unique word in document
    // find out how many times that word appears in document
    // and put it into a dictionary
    console.log(document);

    var dict = {};

    var unique_words_set = new Set(document);
    let unique_words = Array.from(unique_words_set);
    // loops through all unique words
    for (var i = 0; i <= unique_words.length - 1; i++){
        dict[unique_words[i]] = 0
        // loops through all words in document
        for (var x = 0; x <= document.length -1; x++){
            if (unique_words[i] == document[x]){
                dict[unique_words[i]] = dict[unique_words[i]] + 1;
            }
        }
    }

    // term frequency is calculated this way
    var returnDict = {}
    var documentLength = document.length;
    for (const [key, value] of Object.entries(dict)) {
        returnDict[key] = value / documentLength
      }
    return returnDict;
}

function termFrequencySentences(documents){

    // calculate TF Value of each indivudal word in a sentence
    // add them all up in order to find tf value of each sentence

    var dictSentences = {};
    for (i = 0; i <= documents.length - 1; i++){
        let x = termFrequency(documents[i]);
        let y = 0;

        // get seperate TF values for every word in that sentence
        for (const [key, value] of Object.entries(dict)){
            y = y + value;
        }

        // y needs to be a probability over the length of the sentence
        // maybe?
        y = y / documents[i].length;

        // creates a dictionary of sentences with TF values in it
        dictSentences(documents[i]) = y;
    }

    return dictSentences;

}

// each document is a sentence
function inverseDocumentFrequency(documents){
    lengthOfDocuments = documents.length;

    var TFDocuments = [];
    // calculate TF values of all documents
    for (var i = 0; i <= documents.length - 1; i++){
        TFDocuments[i] = termFrequency(documents[i]);
    }

    // gets all unique words in all TF dictionaries
    allWords = [];
    allWordsSet = Set();
    for (var i = 0; i <= TFDocuments.length - 1; i++){
        for (const [key, value] of Object.entries(dict)){
            allWords.add[key];
            allWordsSet.add[key];
        }
    }

    let unique_words_set = Array.from(allWordsSet);

    TFValsWord = {};
    for (i = 0; i <= allWords.length - 1; i ++){
        IDFVals[allWords[i]] = IDFVals[allWords[i]] + 1;
    }

    IDFVals = {};
    for (i = 0; i <= TFVals.length - 1; i++){
        IDFVals[unique_words_set[i]] = Math.log(lengthOfDocuments / IDFVals[i]);
    }
    return IDFVals;
}

// https://stackoverflow.com/questions/42488048/javascript-sum-of-two-object-with-same-properties
function sumObjectsByKey(...objs) {
    return objs.reduce((a, b) => {
      for (let k in b) {
        if (b.hasOwnProperty(k))
          a[k] = (a[k] || 0) + b[k];
      }
      return a;
    }, {});
}

function TFIDF(documents){
    let TFVals = [];
    for (i = 0; i <= documents.length - 1; i++){
        TFVals.add(termFrequencySentences(documents[i]));
    }

    var IDFVals = inverseDocumentFrequency(documents);
}

// get all text from .story-body within p tags on a BBC news web article
// we want to split this one long string into an array of sentences
// sentences end with a full stop
// the first array index is "share this on social media" so isn't useful to us.
var $article = $('.story-body').find('p').contents().text().split(".");
$article[0] = "and"

console.log(termFrequency($article));

// console.log(inverseDocumentFrequency([['yes', 'yes', 'hello', 'yes'], ['yes', 'hello']]));
