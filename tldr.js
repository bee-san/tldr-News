/*(
Produced by Brandon Skerritt
https://skerritt.tech
Instagram: @brandon.codes
Email: brandon@skerritt.tech

Remove stop words
Create frequency table of words - how many times each word appears in the text
Assign TF score to each sentence depending on the words it contains and the frequency table
Assign IDF Score to each sentence, same as above
Build summary by adding every sentence above a certain score threshold
Only chooses top 3 highest scoring sentences
*/    

// import jquery CDN

function prettify(document){
    // Turns an array of words into lowercase and removes stopwords
    const stopwords = ["a", "", "share", "linkthese", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves", "this"];
    // turn document into lowercase words, remove all stopwords
    var document = document.replace(/[.,]/g, '');
    let document_in_lowercase = document.split(" ").map(function(x){ return x.toLowerCase() });
    return document_in_lowercase.filter( x => !stopwords.includes(x) );
}

function countWords(words){
    // returns a dictionary of {WORD: COUNT} where count is
    // how many times that word appears in "words".
    const unique_words = uniqueWords(words);
    let dict = {};
    // for every single unique word
    for (let i = 0; i <= unique_words.length - 1; i++){
        dict[unique_words[i]] = 0
        // see how many times this unique word appears in all words
        for (let x = 0; x <= words_without_stopwords.length -1; x++){
            if (unique_words[i] == words[x]){
                dict[unique_words[i]] = dict[unique_words[i]] + 1;
            }
        }
    }
    return dict;
}

function uniqueWords(words){
    const unique_words_set = new Set(words);
    return unique_words = Array.from(unique_words_set);
}

function termFrequency(document){
    // calculates term frequency of each sentence

    words_without_stopwords = prettify(document);
    // sentences after other sentences have spaces before them
    // "Hello. Brandon" has a space before "Brandon". This gets
    // rid of it.
    const sentences = document.split(".").map(item => item.trim());
    sentences[0] = sentences[0].substring(146);

    const dict = countWords(words_without_stopwords)

    const unique_words = uniqueWords(words_without_stopwords);

    // actually makes it TF values
    for (const [key, value] of Object.entries(dict)){
        dict[key] = dict[key] / words_without_stopwords.length;
    }
    // splits it up into sentences now

    var TFSentences = {};
    // for every sentence
    for (let i = 0; i <= sentences.length - 1; i ++){
        // for every word in that sentence
        let sentence_split_words = sentences[i].split(" ");
        // get the assiocated TF values of each word
        // temp.add is the "TF" value of a sentence, we need to divide it at the end
        let temp_add = 0.0;
        for (let x = 0; x <= sentence_split_words.length - 1; x++){
            var words_no_stop_words_length = sentence_split_words[x].length;
            // if the word is not a stopword, get the assiocated TF value and add it to temp_add
            if (sentence_split_words[x].toLowerCase() in dict){
                // adds all the TF values up
                temp_add = temp_add + dict[sentence_split_words[x].toLowerCase()];
            }
            else{
                // nothing, since it's a stop word.
            }
        }
        // term frequency is always between 0 and 1
        // ***** TF sentences divide by X number of items on top
        TFSentences[sentences[i]] = temp_add / words_no_stop_words_length;
    }
    
    return TFSentences;
}

// each document is a        sentence
function inverseDocumentFrequency(documents){
    // calculates the inverse document frequency of every sentence
    const words_without_stopwords = prettify(documents);
    const sentences = documents.split(".")
    //sentences[0] = sentences[0].substring(146);
    const lengthOfDocuments = sentences.length;

    const WordCountDocuments = countWords(words_without_stopwords);
    // calculate TF values of all documents

    const unique_words_set = uniqueWords(words_without_stopwords);

    let IDFVals = {};

    for (let i = 0; i <= unique_words_set.length - 1; i++){
        IDFVals[unique_words_set[i]] = Math.log10(lengthOfDocuments / WordCountDocuments[unique_words_set[i]]);
    }

    let IDFSentences = {};
    // for every sentence
    for (let i = 0; i <= lengthOfDocuments - 1; i ++){
        // for every word in that sentence
        let sentence_split_words = sentences[i].split(" ");
        // get the assiocated IDF values of each word
        // temp.add is the "IDF" value of a sentence, we need to divide it at the end
        let temp_add = 0.0;
        for (let x = 0; x <= sentence_split_words.length - 1; x++){
            // if the word is not a stopword, get the assiocated IDF value and add it to temp_add
            if (sentence_split_words[x] in IDFVals){
                // adds all the IDF values up
                temp_add = temp_add + IDFVals[sentence_split_words[x]];
            }
            else{
                // nothing, since it's a stop word.
            }
        }
        // term frequency is always between 0 and 1
        IDFSentences[sentences[i]] = temp_add / sentence_split_words.length;
    }
    return IDFSentences;
}

function TFIDF(documents){
    // calculates TF*IDF
    const TFVals = termFrequency(documents);
    const IDFVals = inverseDocumentFrequency(documents);

    let TFidfDict = {};

    for (const [key, value] of Object.entries(TFVals)){
        if (key in IDFVals){
            TFidfDict[key] = TFVals[key] * IDFVals[key];
        }
    }


    let max = 0.0;
    let max2 = 0.0;
    let max3 = 0.0;

    let max_sentence = "";
    let max2Sent = "";
    let max3Sent = "";


    // finds the top 3 sentences in TFidfDict
    for (const [key, value] of Object.entries(TFidfDict)){
        if (TFidfDict[key] > max){
            max = TFidfDict[key];
            max_sentence = key;
        }
        else if (TFidfDict[key] > max2 && TFidfDict[key] < max){
            max2 = TFidfDict[key];
            max2Sent = key;
        }
        // do i need the third && here?
        else if (TFidfDict[key] > max3 && TFidfDict[key] < max2 && TFidfDict[key] < max){
            max3 = TFidfDict[key];
            max3Sent = key;
        }
    }

    console.log(max);
    console.log(max_sentence);
    console.log(max2);
    console.log(max2Sent);
    console.log(max3);
    console.log(max3Sent);
    ///console.log(TFidfDict);

    return ("<br>" + "•" + max_sentence + "<br><br>" + "•" + max2Sent + "<br><br>" + "•" + max3Sent);
}

// get all text from .story-body within p tags on a BBC news web article

// console.log(termFrequency("Hello, my name is Brandon. Brandon Brandon. The elephant jumps over the moon"));

let $article = $('.story-body').find('p').text();
console.log(termFrequency($article));
// insert text into body of document
let insert = $('.story-body').prepend(TFIDF($article));
