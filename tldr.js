// <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

// import jquery CDN
var jQueryScript = document.createElement('script');  
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
document.head.appendChild(jQueryScript);

/*

Remove stop words (defined below) for the analysis
Create frequency table of words - how many times each word appears in the text
Assign score to each sentence depending on the words it contains and the frequency table
Build summary by adding every sentence above a certain score threshold

*/

function termFrequency(document){

    // document is an array of strings

    // we want to go through every unique word in document
    // find out how many times that word appears in document
    // and put it into a dictionary

    // https://stackoverflow.com/questions/5631422/stop-word-removal-in-javascript
    var stopwords = ["a", "withemailfacebookmessengermessengertwitterpinterestwhatsapplinkedincopy", "share", "linkthese", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves", "this"];

    // turn document into lowercase words, remove all stopwords
    document_in_lowercase = document.split(" ").map(function(x){ return x.toLowerCase() });
    console.log(document_in_lowercase);
    words_without_stopwords = document_in_lowercase.filter( x => !stopwords.includes(x) );
    console.log(words_without_stopwords);

    // all of this below code does not use stopwords
    var dict = {};
    // sets have no repititions. Quick way to get unique words.
    var unique_words_set = new Set(words_without_stopwords);
    let unique_words = Array.from(unique_words_set);

    // loops through all unique words, counts how many times each word appears
    // into a dictionary like: {WORD: COUNT OF APPERANCES}
    for (var i = 0; i <= unique_words.length - 1; i++){
        dict[unique_words[i]] = 0
        // skips stop words
        if (!(stopwords.includes(unique_words[i]))){
            for (var x = 0; x <= words_without_stopwords.length -1; x++){
                if (unique_words[i] == words_without_stopwords[x]){
                    dict[unique_words[i]] = dict[unique_words[i]] + 1;
                }
            }
        }
        // term frequency is calculated as a percentage. divide how many times
        // a word appears by how many words there are.
        dict[unique_words[i]] = dict[unique_words[i]] / document_in_lowercase.length;
    }

    // assigns a TF value to each sentence

    // splits it up into sentences now
    var sentences = document.split(".");

    var TFSentences = {};
    // for every sentence
    for (i = 0; i <= sentences.length - 1; i ++){
        // for every word in that sentence
        let sentence_split_words = sentences[i].split(" ");
        // get the assiocated TF values of each word
        // temp.add is the "TF" value of a sentence, we need to divide it at the end
        var temp_add = 0.0;
        for (x = 0; x <= sentence_split_words.length - 1; x++){
            // if the word is not a stopword, get the assiocated TF value and add it to temp_add
            if (sentence_split_words[x] in dict){
                // adds all the TF values up
                temp_add = temp_add + dict[sentence_split_words[x]];
            }
            else{
                // nothing, since it's a stop word.
            }
        }
        // term frequency is always between 0 and 1
        TFSentences[sentences[i]] = temp_add / sentences.length;
    }
    
    return TFSentences;
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
    console.log(TFVals);

    var IDFVals = inverseDocumentFrequency(documents);
    console.log(IDFVals);
}

// get all text from .story-body within p tags on a BBC news web article
// we want to split this one long string into an array of sentences
// sentences end with a full stop
// the first array index is "share this on social media" so isn't useful to us.
var $article = $('.story-body').find('p').contents().text();

console.log(inverseDocumentFrequency($article));
// console.log(inverseDocumentFrequency([['yes', 'yes', 'hello', 'yes'], ['yes', 'hello']]));
